import { FC, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";

interface RichTextProps {
   content: string;
   onChange?: (html: string) => void;
}

export const RichText: FC<RichTextProps> = ({ content, onChange }) => {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Bold,
         Italic,
         Heading.configure({ levels: [2, 3] }),
      ],
      immediatelyRender: false,
      content: content,
   });

   useEffect(() => {
      if (!editor || !onChange) return;
      const update = () => onChange(editor.getHTML());
      editor.on("update", update);
      return () => {
         editor.off("update", update);
      };
   }, [editor, onChange]);


   return (
      <div className="flex flex-col">
         <label className="text-wh font-quicksand text-lg pl-3 pb-1">Obsah projektu*</label>
         <div className="flex px-6 rounded-t-3xl bg-prim">
            <button
               onClick={() => editor && editor.chain().focus().toggleBold().run()}
               className={`p-2 ${editor && editor.isActive("bold") ? "bg-sec text-white" : ""}`}
               disabled={!editor}
            >
               B
            </button>

            <button
               onClick={() => editor && editor.chain().focus().toggleItalic().run()}
               className={`p-2 ${editor && editor.isActive("italic") ? "bg-sec text-white" : ""}`}
               disabled={!editor}
            >
               I
            </button>
            <button
               onClick={() => editor && editor.chain().focus().toggleHeading({ level: 2 }).run()}
               className={`p-2 ${editor && editor.isActive("heading", { level: 2 }) ? "bg-sec text-white" : ""}`}
               disabled={!editor}
            >
               H2
            </button>

            <button
               onClick={() => editor && editor.chain().focus().toggleHeading({ level: 3 }).run()}
               className={`p-2 ${editor && editor.isActive("heading", { level: 3 }) ? "bg-sec text-white" : ""}`}
               disabled={!editor}
            >
               H3
            </button>
            <button onClick={() => editor && editor.chain().focus().undo().run()} className="p-2 " disabled={!editor}>
               ↩ Undo
            </button>

            <button onClick={() => editor && editor.chain().focus().redo().run()} className="p-2 " disabled={!editor}>
               ↪ Redo
            </button>
         </div>
         <EditorContent editor={editor} className={'g-sec p-3 !outline-none rounded-b-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-t-0 border-prim transition-transform focus-within:bg-modal'} />
      </div>
   );
};

export default RichText;