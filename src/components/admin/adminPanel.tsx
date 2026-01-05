"use client";
import { useLayout } from "@/context/layoutContext";
import { signOut, useSession } from "next-auth/react";
import { FC, useState } from "react";
import { AdminLink } from "./adminPanelLink";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import ProjectType from "@/types/projectType";
import { AdminTagList } from "./adminTagList";
import { AdminProjectForm } from "./adminProjectForm";
import AdminProjectList from "./adminProjectList";
import { useAdminProject } from "@/context/adminProjectContext";

export const AdminPanel: FC = () => {
  const { data: session } = useSession();
  const layoutData = useLayout();
  const {project, isProjectUnsaved} = useAdminProject();

  type ModalType = "project" | "projectList" | "tagModal";

  const openModal = (m: ModalType) => {
    if(layoutData.activeModalKey === m) {
      layoutData.closeModal();
      return;
    }
    switch (m) {
      case "project":
        layoutData.showModal({
          children: (
            <AdminProjectForm />
          ),
          title: project.id ? `Upravit projekt ${project.name}` : "Vytvořit nový projekt",
        }, m);
        break;
      case "projectList":
        layoutData.showModal({
          children: <AdminProjectList />,
          title: "Správa projektů",
        }, m);
        break;
      case "tagModal":
        layoutData.showModal({
          children: <AdminTagList />,
          title: "Správa tagů",
        }, m);
        break;
    }
  };

  return (
    <>
      <div
        className={
          "fixed w-full bottom-0 left-0 p-4 bg-navbar backdrop-blur-md flex gap-3 items-center justify-center flex-wrap z-[1003]"
        }
      >
        <AdminLink onClick={() => openModal("project")} className={isProjectUnsaved() ? "!text-err" : (layoutData.activeModalKey === "project" ? "!text-prim" : "")} title={isProjectUnsaved() ? `Máš neuložený projekt` : "Vytvořit nový projekt"}/>
        <AdminLink onClick={() => openModal("tagModal")} className={layoutData.activeModalKey === "tagModal" ? "!text-prim" : ""} title="Správa tagů"/>
        <AdminLink onClick={() => openModal("projectList")} className={layoutData.activeModalKey === "projectList" ? "!text-prim" : ""} title="Správa projektů"/>
        <div className="flex items-center gap-3 md:ml-auto font-quicksand">
          <button
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-prim" />
          </button>
          <span className="text-base text-wh">
            Zdravíčko,{" "}
            <span className={"text-pxlgn font-semibold"}>
              {session?.user?.name}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
