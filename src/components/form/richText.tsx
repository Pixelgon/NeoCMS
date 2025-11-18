import { FC, useContext, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { useTopLoader } from "nextjs-toploader";
import Input from "./input";
import RichTextTab from "./richTextTab";
import Image from "next/image";
import { LayoutContext } from "@/context/layoutContext";

interface RichTextProps {
  content: string;
  onChange?: (html: string) => void;
}

export const RichText: FC<RichTextProps> = ({ content, onChange }) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const loader = useTopLoader();
  const layoutData = useContext(LayoutContext);

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

  const applyLink = () => {
    editor?.chain().focus().setLink({ href: inputValue }).run();
    setInputValue("");
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const insertUploadedImage = async () => {
    if (!selectedFile || !editor) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      loader.start();
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
        setShowImageDialog(false);
      }
    } catch (err) {
      console.error("Chyba při nahrávání:", err);
    } finally {
      loader.done();
      setImagePreview(null);
      setSelectedFile(null);
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
    layoutData.showDialog({
      upperPart: (
        <>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            label="Vybrat obrázek"
            name="image-upload"
            id="image-upload"
            className={
              "w-full file:border-none file:text-sec file:bg-pxlgn-gradient file:p-2 file:mr-2 file:rounded-3xl"
            }
            required={false}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Náhled obrázku"
              className="w-full rounded-3xl"
            />
          )}
        </>
      ),
      btnR: {
        text: "Vložit obrázek",
        onClick: () => {
          insertUploadedImage();
          layoutData.closeDialog();
        },
        disabled: !selectedFile,
      },
      btnL: {
        text: "Zrušit",
        onClick: () => {
          layoutData.closeDialog();
          setSelectedFile(null);
          setImagePreview(null);
        },
      },
    });
  };

  return (
    <div className="flex flex-col">
      <span className="text-wh font-quicksand text-lg pl-3 pb-1">
        Obsah projektu*
      </span>
      <div className="flex px-6 rounded-t-3xl bg-pxlgn-gradient text-sec font-quicksand">
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
        <RichTextTab onClick={() => setShowImageDialog(true)}>
          Obrázek
        </RichTextTab>
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