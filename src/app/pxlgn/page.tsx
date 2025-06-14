'use client';
import { Header } from "@/components/header/Index";
import { AdminProjectList } from "@/components/layout/AdminProjectList";
import { Btn } from "@/components/layout/Btn";
import { ProjectModal } from "@/components/layout/ProjectModal";
import { Section } from "@/components/layout/Section";
import { LayoutContext } from "@/context/LayoutContext";
import ProjectType from "@/types/ProjectType";
import { useSession, signIn, signOut } from "next-auth/react";
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

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType>(emptyProject);
  const [modal, setModal] = useState(false);
  const layoutData = useContext(LayoutContext);

  const openProjectModal = (id?: string) => {
    setModal(true);
    layoutData.toggleScroll();
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .then(() => setModal(true))
        .then(() => console.log(project));
    } else {  
      setProject(emptyProject);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <>
        <Header bg="/images/headers/projects-header.webp" title="Admin panel"/>
        <main>
          <Section isPrim>
            <div className="flex gap-3">
              <Btn onClick={() => openProjectModal()} prim>Vytvořit nový projekt</Btn>
              <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Odhlásit se</Btn>
            </div>
            <AdminProjectList projects={projects} openProjectModal={openProjectModal} />
          </Section>
        </main>
        <ProjectModal project={project} setProject={setProject} modalState={modal} setModalState={setModal} />
      </>
    );
  }
};

export default AdminPage;