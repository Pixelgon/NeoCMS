import { FC, ChangeEvent, useState } from "react";
import Input from "../form/input";
import { Btn } from "../layout/btn";
import ImageUpload from "../form/imageUpload";
import TagInput from "../tag/tagInput";
import { useTopLoader } from "nextjs-toploader";
import { useLayout } from "@/context/layoutContext";
import RichText from "../form/richText";
import ProjectType from "@/types/projectType";
import { useAdminProject } from "@/context/adminProjectContext";
import AdminProjectList from "./adminProjectList";

export const AdminProjectForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loader = useTopLoader();
  const layoutData = useLayout();
  const {
    project,
    setProject,
    updateProject: onChange,
    resetProject,
    savedProject,
    isProjectComplete,
    isProjectModified,
    saveProject,
  } = useAdminProject();

  const normalizeSlug = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Odstraní diakritiku
      .replace(/[^a-z0-9\s-]/g, "") // Odstraní nepovolené znaky
      .replace(/\s+/g, "-") // Nahradí mezery pomlčkami
      .replace(/-+/g, "-") // Sloučí více pomlček za sebou
      .replace(/^-+|-+$/g, ""); // Odstraní pomlčky ze začátku a konce

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      const autoSlug = normalizeSlug(value);
      const currentSlug = project.slug;
      const originalNameSlug = project.name ? normalizeSlug(project.name) : "";
      const shouldAutoGenerateSlug =
        !currentSlug || currentSlug === originalNameSlug;
      const patch: Partial<ProjectType> = { name: value };
      if (shouldAutoGenerateSlug) {
        patch.slug = autoSlug;
      }
      onChange(patch);
    } else if (name === "slug") {
      onChange({ slug: normalizeSlug(value) });
    } else {
      onChange({ [name]: value } as Partial<ProjectType>);
    }
  };

  // Tlačítko je disabled pokud projekt není kompletní, nebyl upraven nebo se submittuje
  const isSubmitDisabled =
    !isProjectComplete() || !isProjectModified() || isSubmitting;

  const handleRichTextChange = (content: string) => {
    onChange({ body: content });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setIsSubmitting(true);
    loader.start();

    const wasEditing = !!project.id;

    try {
      const result = await saveProject();

      if (result.ok) {
        layoutData.showToast({
          message: wasEditing
            ? "Projekt byl aktualizován"
            : "Projekt byl vytvořen",
          type: "success",
        });

        resetProject();
        layoutData.closeModal();
        if (wasEditing) {
          layoutData.showModal({
            children: <AdminProjectList />,
            title: "Správa projektů",
          });
        }
      } else {
        layoutData.showToast({
          message: result.error || "Chyba při ukládání projektu",
          type: "error",
        });
      }
    } catch (error) {
      layoutData.showToast({
        message: "Chyba při ukládání projektu",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      loader.done();
    }
  };

  return (
    <form
      className="flex flex-col gap-2 w-full justify-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        type="text"
        placeholder="Název projekt"
        name="name"
        id="name"
        label="Jméno*"
        value={project?.name || ""}
        onChange={handleInputChange}
        required
      />
      <Input
        type="text"
        placeholder="Slug"
        name="slug"
        id="slug"
        label="Slug*"
        value={project?.slug || ""}
        onChange={handleInputChange}
        required
      />
      <Input
        type="text"
        placeholder="Popis"
        name="description"
        id="description"
        label="Popis*"
        value={project?.description || ""}
        onChange={handleInputChange}
        required
        limit={155}
      />
      <ImageUpload
        name="bg"
        id="bg"
        label="Pozadí*"
        value={project?.background || ""}
        onChange={(url) =>
          handleInputChange({
            target: { name: "background", value: url },
          } as ChangeEvent<HTMLInputElement>)
        }
        required
      />
      <ImageUpload
        name="photo"
        id="photo"
        label="Titulní obrázek*"
        value={project?.photo || ""}
        onChange={(url) =>
          handleInputChange({
            target: { name: "photo", value: url },
          } as ChangeEvent<HTMLInputElement>)
        }
        required
      />
      <RichText
        content={project?.body || ""}
        onChange={handleRichTextChange}
        label="Obsah projektu*"
      />
      <TagInput tags={project?.tags} setTags={(tags) => onChange({ tags })} />
      <div className={"flex mt-5 gap-2"}>
        <Btn prim type="submit" disabled={isSubmitDisabled}>
          {isSubmitting
            ? "Ukládám..."
            : project.id
            ? "Uložit změny"
            : "Vytvořit projekt"}
        </Btn>
        {project.id && (
          <Btn
            type="button"
            disabled={isSubmitting || !isProjectModified()}
            onClick={() => {
              layoutData.showDialog({
                message: "Opravdu chcete zahodit všechny neuložené změny?",
                btnR: {
                  text: "Ano",
                  onClick: () => {
                    layoutData.closeDialog();
                    if (savedProject) {
                      setProject(savedProject);
                    }
                  },
                },
                btnL: {
                  text: "Ne",
                  onClick: () => layoutData.closeDialog(),
                },
              });
            }}
          >
            Zahodit změny
          </Btn>
        )}
        <Btn
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            layoutData.showDialog({
              message:
                "Opravdu chcete smazat všechny neuložené změny tohoto projektu?",
              btnR: {
                text: "Ano",
                onClick: () => {
                  layoutData.closeDialog();
                  layoutData.showModal({
                    children: <AdminProjectForm />,
                    title: "Vytvořit nový projekt",
                  });
                  resetProject();
                },
              },
              btnL: {
                text: "Ne",
                onClick: () => layoutData.closeDialog(),
              },
            });
          }}
        >
          Nový projekt
        </Btn>
      </div>
    </form>
  );
};
