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

  const setProject = useCallback((p: ProjectType) => {
    setProjectState(p);
  }, []);

  const updateProject = useCallback((patch: Partial<ProjectType>) => {
    setProjectState(prev => ({ ...prev, ...patch }));
  }, []);

  const resetProject = useCallback(() => {
    setProjectState(emptyProject);
  }, []);

  return (
    <AdminProjectContext.Provider value={{ project, setProject, updateProject, resetProject }}>
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