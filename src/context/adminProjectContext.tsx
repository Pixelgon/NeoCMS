'use client';
import { AdminProjectContextType } from "@/types/adminProjectContextType";
import ProjectType from "@/types/projectType";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

const emptyProject: ProjectType = {
   id: "",
   name: "",
   slug: "",
   body: "",
   description: "",
   background: "",
   photo: "",
   tags: [],
   visible: true,
};

const AdminProjectContext = createContext<AdminProjectContextType | null>(null);

export const AdminProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProjectState] = useState<ProjectType>(emptyProject);
  const [savedProject, setSavedProjectState] = useState<ProjectType | null>(null);

  const setProject = useCallback((p: ProjectType) => {
    setProjectState(p);
    if (p.id) {
      setSavedProjectState({ ...p });
    } else {
      setSavedProjectState(null);
    }
  }, []);

  const updateProject = useCallback((patch: Partial<ProjectType>) => {
    setProjectState(prev => ({ ...prev, ...patch }));
  }, []);

  const resetProject = useCallback(() => {
    setProjectState(emptyProject);
    setSavedProjectState(null);
  }, []);

  // Kontrola, zda je projekt kompletní
  const isProjectComplete = useCallback(() => {
    return !!(
      project.name &&
      project.slug &&
      project.background &&
      project.photo &&
      project.body &&
      project.description &&
      project.tags.length > 0
    );
  }, [project]);

  const isProjectEmpty = useCallback(() => {
    console.log("Checking if project is empty:", project);
    return (
      !project.name &&
      !project.slug &&
      !project.background &&
      !project.photo &&
      !project.body &&
      !project.description &&
      project.tags.length === 0
    );
  }, [project]);

  // Kontrola, zda byl projekt upraven
  const isProjectModified = () => {
    if (!project.id || !savedProject) return false;

    const tagsChanged =
      JSON.stringify([...project.tags].sort()) !==
      JSON.stringify([...savedProject.tags].sort());

    return (
      project.name !== savedProject.name ||
      project.slug !== savedProject.slug ||
      project.background !== savedProject.background ||
      project.photo !== savedProject.photo ||
      project.body !== savedProject.body ||
      project.description !== savedProject.description ||
      tagsChanged
    );
  };

  const isProjectUnsaved = () => {
    if (!project.id) {
      return !isProjectEmpty();
    }
    return isProjectModified();
  };

  const saveProject = useCallback(async (projectOverride?: ProjectType) => {
    const projectToSave = projectOverride ?? project;
    const url = projectToSave.id
      ? `/api/projects/${projectToSave.id}`
      : "/api/projects";
    const method = projectToSave.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectToSave),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage =
          typeof errorBody?.error === "string"
            ? errorBody.error
            : "Chyba při ukládání projektu";
        return { ok: false as const, error: errorMessage };
      }

      const data: any = await response.json().catch(() => ({}));

      const idFromResponse =
        typeof data?.id === "string" && data.id.length > 0 ? data.id : undefined;

      const normalizedSavedProject: ProjectType = {
        ...projectToSave,
        id: idFromResponse ?? projectToSave.id,
      };

      setProjectState(normalizedSavedProject);
      setSavedProjectState({ ...normalizedSavedProject });

      return { ok: true as const, data };
    } catch {
      return { ok: false as const, error: "Chyba při ukládání projektu" };
    }
  }, [project]);

  return (
    <AdminProjectContext.Provider value={{ project, setProject, updateProject, resetProject, savedProject, isProjectComplete, isProjectModified, saveProject, isProjectUnsaved }}>
      {children}
    </AdminProjectContext.Provider>
  );
};

export const useAdminProject = () => {
  const ctx = useContext(AdminProjectContext);
  if (!ctx) {
    throw new Error("useAdminProject must be used within AdminProjectProvider");
  }
  return ctx;
};