'use client';
import { Header } from "@/Components/Header";
import { AdminProjectList } from "@/Components/Layout/AdminProjectList";
import { Btn } from "@/Components/Layout/Btn";
import { ProjectModal } from "@/Components/Layout/ProjectModal";
import { Section } from "@/Components/Layout/section";
import { LayoutContext } from "@/context/LayoutContext";
import ProjectType from "@/types/ProjectType";
import { useSession, signIn, signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [modal, setModal] = useState(false);
  const layoutData = useContext(LayoutContext);

  useEffect(() => { 
    //layoutData.toggleScroll();
  }, [modal]);

  const openProjectModal = (id?: string) => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .then(() => setModal(true));
    } else {
      setProject(null);
      setModal(true);
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
  }, []);

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
        {project && <ProjectModal project={project} setProject={setProject} modalState={modal} setModalState={setModal} />}
      </>
    );
  }
};

export default AdminPage;