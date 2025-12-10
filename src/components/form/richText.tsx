import { FC, useContext, useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { useTopLoader } from "nextjs-toploader";
import Input from "./input";
import RichTextTab from "./richTextTab";
import { useLayout } from "@/context/layoutContext";
import ImageUpload from "./imageUpload";

interface RichTextProps {
  content: string;
  onChange?: (html: string) => void;
}

export const RichText: FC<RichTextProps> = ({ content, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const selectedFileRef = useRef<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const loader = useTopLoader();
  const layoutData = useLayout();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class:
            "font-quicksand bg-pxlgn-gradient text-transparent bg-clip-text hover:brightness-75 transition-all duration-300",
          rel: "external nofollow noopener",
          target: "_blank",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "rounded-3xl w-full h-auto object-contain mt-4",
        },
      }),
    ],
    content,
  });

  useEffect(() => {
    if (!editor) return;
    const update = () => onChange && onChange(editor.getHTML());
    editor.on("update", update);
    return () => {
      editor.off("update", update);
    };
  }, [editor, onChange]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const applyLink = () => {
    editor?.chain().focus().setLink({ href: inputValue }).run();
    setInputValue("");
  };

  const insertUploadedImage = async () => {
    const file = selectedFileRef.current;
    
    if (!file || !editor) {
      layoutData.showToast?.({
        message: "Nejprve vyberte obrázek",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      loader.start();
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
        setImagePreview("");
        selectedFileRef.current = null;
      } else {
        layoutData.showToast?.({
          message: "Obrázek nebyl nahrán",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Chyba při nahrávání:", err);
      layoutData.showToast?.({
        message: "Chyba při nahrávání obrázku",
        type: "error",
      });
    } finally {
      loader.done();
    }
  };

  const OpenLinkDialog = () => {
    layoutData.showDialog({
      upperPart: (
        <Input
          type="url"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="https://..."
          name="link-url"
          id="link-url"
          required={false}
          label="Odkaz"
          className="w-full"
        />
      ),
      btnR: {
        text: "Vložit",
        onClick: () => {
          applyLink();
          layoutData.closeDialog();
        },
      },
      btnL: { text: "Zrušit", onClick: () => layoutData.closeDialog() },
    });
  };

  const OpenImageDialog = () => {
    // Reset state
    setImagePreview("");
    selectedFileRef.current = null;
    
    layoutData.showDialog({
      upperPart: (
        <ImageUpload
          id="rich-image-upload"
          name="rich-image-upload"
          label="Nahrát obrázek"
          value={imagePreview}
          onChange={(file) => {
            if (file) {
              const preview = URL.createObjectURL(file);
              setImagePreview(preview);
              selectedFileRef.current = file;
            } else {
              setImagePreview("");
              selectedFileRef.current = null;
            }
          }}
        />
      ),
      btnR: {
        text: "Vložit obrázek",
        onClick: async () => {
          await insertUploadedImage();
          layoutData.closeDialog();
        },
      },
      btnL: {
        text: "Zrušit",
        onClick: () => {
          layoutData.closeDialog();
          selectedFileRef.current = null;
          setImagePreview("");
        },
      },
    });
  };

  return (
    <div className="flex flex-col">
      <span className="text-wh font-quicksand text-lg pl-3 pb-1">
        Obsah projektu*
      </span>
      <div className="flex px-2 rounded-t-3xl border bg-sec border-prim text-prim font-quicksand overflow-auto">
        <RichTextTab
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          B
        </RichTextTab>
        <RichTextTab
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          I
        </RichTextTab>
        <RichTextTab
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor?.isActive("heading", { level: 2 })}
        >
          H2
        </RichTextTab>
        <RichTextTab
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor?.isActive("heading", { level: 3 })}
        >
          H3
        </RichTextTab>
        <RichTextTab onClick={() => OpenLinkDialog()}>Link</RichTextTab>
        <RichTextTab onClick={() => OpenImageDialog()}>Obrázek</RichTextTab>
        <RichTextTab
          onClick={() => editor?.chain().focus().undo().run()}
          isActive={false}
        >
          ↩ Undo
        </RichTextTab>
        <RichTextTab
          onClick={() => editor?.chain().focus().redo().run()}
          isActive={false}
        >
          ↪ Redo
        </RichTextTab>
      </div>

      <EditorContent
        editor={editor}
        className="g-sec p-3 !outline-none rounded-b-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-t-0 border-prim transition-transform focus-within:bg-modal"
      />
    </div>
  );
};

export default RichText;
