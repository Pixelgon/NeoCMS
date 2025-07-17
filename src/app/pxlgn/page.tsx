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
  body: "",
  description: "",
  background: "",
  photo: "",
  tags: [],
  updatedAt: new Date(),
  createdAt: new Date(),
};

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [project, setProject] = useState<ProjectType>(emptyProject);
  const [modal, setModal] = useState(false);
  const layoutData = useContext(LayoutContext);
  const [loading, setLoading] = useState(true);
  const loader = useTopLoader();

  const openProjectModal = async(projectID?: string) => {
    loader.start();
    if(projectID) {
      await fetch(`/api/projects/${projectID}`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        })
        .catch((error) => {
          layoutData.showToast({ message: error, type: "error" });
        });
    }
    else {
      setProject(emptyProject);
    }
    loader.done();
    setModal(true);
  }

  useEffect(() => {
    if (status === "authenticated") {
      const load = async () => {
        loader.start();
        setLoading(true);
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        loader.done();
        setLoading(false);
      };
      load();
    }
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
              <Btn onClick={() => openProjectModal() } prim>Vytvořit nový projekt</Btn>
              <Btn onClick={() => signOut({callbackUrl: "/", redirect: true})}>Odhlásit se</Btn>
            </div>
            <AdminProjectList 
              projects={projects} 
              openProjectModal={openProjectModal}
              loading={loading}
            />
          </Section>
        </main>
        <ProjectModal project={project} setProject={setProject} modalState={modal} setModalState={setModal} />
      </>
    );
  }
};

export default AdminPage;