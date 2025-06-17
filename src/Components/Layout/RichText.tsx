import { FC, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Dialog } from "./Dialog";
import Input from "./Input";
import { Btn } from "./Btn";

interface RichTextProps {
  content: string;
  onChange?: (html: string) => void;
}

export const RichText: FC<RichTextProps> = ({ content, onChange }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Heading.configure({ levels: [2, 3] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "font-quicksand bg-pxlgn-gradient text-transparent bg-clip-text hover:brigthness-50 transition-all duration-300" },
      }),
      Image,
    ],
    content: content,
  });

  useEffect(() => {
    if (!editor || !onChange) return undefined;
    const update = () => onChange(editor.getHTML());
    editor.on("update", update);
    return () => editor.off("update", update);
  }, [editor, onChange]);

  const applyLink = () => {
    editor?.chain().focus().setLink({ href: inputValue }).run();
    setShowLinkDialog(false);
    setInputValue("");
  };

  const applyImage = () => {
    editor?.chain().focus().setImage({ src: inputValue }).run();
    setShowImageDialog(false);
    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <label className="text-wh font-quicksand text-lg pl-3 pb-1">Obsah projektu*</label>

      <div className="flex px-6 rounded-t-3xl bg-prim">
        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 ${editor?.isActive("bold") ? "bg-sec text-white" : ""}`}>B</button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 ${editor?.isActive("italic") ? "bg-sec text-white" : ""}`}>I</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 ${editor?.isActive("heading", { level: 2 }) ? "bg-sec text-white" : ""}`}>H2</button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 ${editor?.isActive("heading", { level: 3 }) ? "bg-sec text-white" : ""}`}>H3</button>
        <button onClick={() => setShowLinkDialog(true)} className="p-2">🔗 Link</button>
        <button onClick={() => setShowImageDialog(true)} className="p-2">🖼 Obrázek</button>
        <button onClick={() => editor?.chain().focus().undo().run()} className="p-2">↩ Undo</button>
        <button onClick={() => editor?.chain().focus().redo().run()} className="p-2">↪ Redo</button>
      </div>

      <EditorContent editor={editor} className="g-sec p-3 !outline-none rounded-b-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-t-0 border-prim transition-transform focus-within:bg-modal" />

      <Dialog DialogState={showLinkDialog}>
         <Input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="https://..."
            name="link-url"
            id="link-url"
            required={false}
            label="Odkaz"
         />
         <div className="flex gap-2 justify-end">
            <Btn onClick={applyLink} prim>Vložit</Btn>
            <Btn onClick={() => setShowLinkDialog(false)}>Zrušit</Btn>
         </div>
      </Dialog>

        <Dialog DialogState={showImageDialog}>
            <Input
              type="url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://..."
              label="URL obrázku"
              name="image-url"
              id="image-url"
              required={false}
            />
            <div className="flex gap-2 justify-end">
              <Btn onClick={applyImage} prim>Vložit</Btn>
              <Btn onClick={() => setShowImageDialog(false)}>Zrušit</Btn>
            </div>
        </Dialog>
    </div>
  );
};

export default RichText;