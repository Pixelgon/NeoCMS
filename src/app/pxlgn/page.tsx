'use client';
import { Header } from "@/Components/Header";
import { AdminProject } from "@/Components/Layout/AdminProject";
import { Btn } from "@/Components/Layout/btn";
import { Modal } from "@/Components/Layout/modal";
import { ProjectModal } from "@/Components/Layout/ProjectModal";
import { Section } from "@/Components/Layout/section";
import { Project } from "@prisma/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { use, useEffect, useState } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  // všechny projekty
  const [projects, setProjects] = useState<Project[]>([]);
  // modal pro editaci/vytvoření projektu
  const [project, setProject] = useState<Project | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const openProjectModal = (id?: string) => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .then(() => setModal(true));
    }
    else {
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
               <div className={'flex gap-3'}>
                  <Btn onClick={() => setModal(true)} prim>Vytvořit nový projekt</Btn>
                  <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Odhlásit se</Btn>
               </div>
               <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full items-center mt-5 justify-center'}>
                  {projects.length > 0 ? (
                      projects.map((project, index) => (
                        <AdminProject key={project.id} title={project.title} image={project.photo} edit={() => openProjectModal(project.id)}/>
                      ))
                    ) : (
                    <p>Neexistuje žádný projekt.</p>
                    )
                  }
               </div>
            </Section>
         </main>
         <ProjectModal project={project} setProject={setProject} modalState={modal} setModalState={setModal}/>
      </>
    );
  }
};

export default AdminPage;