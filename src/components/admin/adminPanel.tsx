"use client";
import { useLayout } from "@/context/layoutContext";
import { signOut, useSession } from "next-auth/react";
import { useTopLoader } from "nextjs-toploader";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { AdminLink } from "./adminPanelLink";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import ProjectType from "@/types/projectType";
import { AdminTagList } from "./adminTagList";
import { AdminProjectForm } from "./adminProjectForm";
import AdminProjectList from "./adminProjectList";

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

export const AdminPanel: FC = () => {
  const { data: session } = useSession();
  const layoutData = useLayout();

  const loader = useTopLoader();
  
  type ModalType = "project" | "projectList" | "tagModal";

  const openModal = (modalType: ModalType) => {
    
    switch (modalType) {
      case "project":
        layoutData.showModal({
          children: (
            <AdminProjectForm />
          ),
          title: "Vytvořit nový projekt",
        });
        break;
      case "projectList":
        layoutData.showModal({
          children: <AdminProjectList />,
          title: "Správa projektů",
        });
        break;
      case "tagModal":
        layoutData.showModal({
          children: <AdminTagList />,
          title: "Správa tagů",
        });
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
        <AdminLink onClick={() => openModal("project")}>
          Vytvořit nový projekt
        </AdminLink>
        <AdminLink onClick={() => openModal("tagModal")}>Správa tagů</AdminLink>
        <AdminLink onClick={() => openModal("projectList")}>
          Správa projektů
        </AdminLink>
        <div className="flex items-center gap-3 md:ml-auto font-quicksand">
          <AdminLink
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
          </AdminLink>
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
