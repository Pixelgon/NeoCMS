'use client';
import { Header } from "@/components/header/Index";
import { AdminProjectList } from "@/components/layout/AdminProjectList";
import { Btn } from "@/components/layout/Btn";
import { ProjectModal } from "@/components/layout/ProjectModal";
import { Section } from "@/components/layout/Section";
import { LayoutContext } from "@/context/LayoutContext";
import ProjectType from "@/types/ProjectType";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTopLoader } from "nextjs-toploader";
import { useContext, useEffect, useState } from "react";

const emptyProject: ProjectType = {
  id: "",
  name: "",
  slug: "",
  background: "",
  photo: "",
  body: "",
  tags: [],
  description: "",
  createdAt: "",
  updatedAt: "",
};

const openProjectModal = (project: ProjectType, setProject: (project: ProjectType) => void, setModal: (state: boolean) => void) => {
  setProject(project);
  setModal(true);
  
}

const loader = useTopLoader();


const AdminPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType>(emptyProject);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      loader.start();
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
    loader.done();
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <>
        <Header bg="/images/headers/projects-header.webp" title="Admin panel"/>
        <main>
          <Section isPrim>
            <div className="flex gap-3">
              <Btn onClick={() => openProjectModal(project, setProject, setModal) } prim>Vytvořit nový projekt</Btn>
              <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Odhlásit se</Btn>
            </div>
            <AdminProjectList 
              projects={projects} 
              openProjectModal={(id?: string) => {
                const selected = projects.find(p => p.id === id) || emptyProject;
                openProjectModal(selected, setProject, setModal);
              }} 
            />
          </Section>
        </main>
        <ProjectModal project={project} setProject={setProject} modalState={modal} setModalState={setModal} />
      </>
    );
  }
};

export default AdminPage;