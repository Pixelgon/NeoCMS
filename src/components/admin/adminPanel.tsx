"use client";
import { useLayout } from "@/context/layoutContext";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import { AdminLink } from "./adminPanelLink";
import {
  ArrowLeftStartOnRectangleIcon,
  PlusCircleIcon,
  TagIcon,
  FolderOpenIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { AdminTagList } from "./adminTagList";
import { AdminProjectForm } from "./adminProjectForm";
import AdminProjectList from "./adminProjectList";
import { useAdminProject } from "@/context/adminProjectContext";
import { useBlock } from "@/context/blockContext";

export const AdminPanel: FC = () => {
  const { data: session } = useSession();
  const layoutData = useLayout();
  const {project, isProjectUnsaved} = useAdminProject();
  const {saveAll, resetAll, unsavedBlocksCount} = useBlock();

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

  const onSaveAll = async () => {
    layoutData.showDialog({
      message: "Opravdu chcete uložit všechny změny bloků? Tato akce nelze vrátit zpět.",
      btnR: {
        text: "Ano",
        onClick: async () => {
          layoutData.closeDialog();
          const result = await saveAll();
          if(result.ok) {
            layoutData.showToast({ message: "Všechny bloky byly úspěšně uloženy.", type: "success" });
          } else {
            layoutData.showToast({ message: "Některé bloky se nepodařilo uložit. Zkuste to znovu.", type: "error" });
          }
        },
      },
      btnL: {
        text: "Ne",
        onClick: () => layoutData.closeDialog(),
      },
    });
  };

   const onResetAll = () => {
     layoutData.showDialog({
       message: "Opravdu chcete zahodit všechny změny bloků? Tato akce nelze vrátit zpět.",
       btnR: {
         text: "Ano",
         onClick: () => {
           layoutData.closeDialog();
           resetAll();
           layoutData.showToast({ message: "Všechny změny bloků byly zahozeny.", type: "success" });
         },
       },
       btnL: {
         text: "Ne",
         onClick: () => layoutData.closeDialog(),
       },
     });
   };

  return (
    <>
      <div
        className={
          "fixed w-full bottom-0 left-0 p-4 bg-navbar backdrop-blur-md flex gap-4 items-center justify-center flex-wrap z-[1003]"
        }
      >
        <AdminLink onClick={() => openModal("project")} className={isProjectUnsaved() ? "!text-err" : (layoutData.activeModalKey === "project" ? "!text-prim" : "")}><PlusCircleIcon className="w-5 h-5" /><span>{isProjectUnsaved() ? `Máš neuložený projekt` : "Vytvořit nový projekt"}</span></AdminLink>
        <AdminLink onClick={() => openModal("tagModal")} className={layoutData.activeModalKey === "tagModal" ? "!text-prim" : ""}><TagIcon className="w-5 h-5" /><span>Správa tagů</span></AdminLink>
        <AdminLink onClick={() => openModal("projectList")} className={layoutData.activeModalKey === "projectList" ? "!text-prim" : ""}><FolderOpenIcon className="w-5 h-5" /><span>Správa projektů</span></AdminLink>
          <div className={"flex flex-grow justify-end gap-4 items-center"}>
            <AnimatePresence>
              {unsavedBlocksCount > 0 && (
                <>
                  <motion.span
                    className={"text-err uppercase"}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                  Bloky: {unsavedBlocksCount}
                  </motion.span>
                  <AdminLink
                    onClick={() => {
                      onSaveAll();
                    }}
                    className="text-err"
                    >
                    <CloudArrowUpIcon className="w-5 h-5" />
                    <span>Uložit vše</span>
                  </AdminLink>
                  <AdminLink
                    onClick={() => {
                      onResetAll();
                    }}>
                    <ArrowPathIcon className="w-5 h-5" />
                    <span>Resetovat vše</span>
                  </AdminLink>
                </>
              )}
            </AnimatePresence>
          <AdminLink onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 text-prim" />
            <span className={"text-pxlgn font-semibold"}>
            {`${session?.user?.name}`}
            </span>
          </AdminLink>
          </div>
      </div>
    </>
  );
};

export default AdminPanel;
