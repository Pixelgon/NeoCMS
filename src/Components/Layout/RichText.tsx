import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";

interface RichTextProps {
   content: string;
}

export const RichText: FC<RichTextProps> = ({ content }) => {
   const editor = useEditor({
      extensions: [
         StarterKit,
         Bold,
         Italic,
         Heading.configure({ levels: [2, 3] }),
      ],
      content: content,
   });

   if (!editor) return null;

   return (
      <div className="flex flex-col">
         <label className="text-wh font-quicksand text-lg pl-3 pb-1">Obsah projektu*</label>

         {/* Toolbar */}
         <div className="flex px-6 rounded-t-3xl bg-prim">
            <button
               onClick={() => editor.chain().focus().toggleBold().run()}
               className={`p-2 ${editor.isActive("bold") ? "bg-sec text-white" : ""}`}
            >
               B
            </button>

            <button
               onClick={() => editor.chain().focus().toggleItalic().run()}
               className={`p-2 ${editor.isActive("italic") ? "bg-sec text-white" : ""}`}
            >
               I
            </button>
            <button
               onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               className={`p-2 ${editor.isActive("heading", { level: 2 }) ? "bg-sec text-white" : ""}`}
            >
               H2
            </button>

            <button
               onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
               className={`p-2 ${editor.isActive("heading", { level: 3 }) ? "bg-sec text-white" : ""}`}
            >
               H3
            </button>
            <button onClick={() => editor.chain().focus().undo().run()} className="p-2 ">
               ↩ Undo
            </button>

            <button onClick={() => editor.chain().focus().redo().run()} className="p-2 ">
               ↪ Redo
            </button>
         </div>

         {/* Editor */}
         <EditorContent editor={editor} className={'g-sec p-3 !outline-none rounded-b-3xl text-wh font-quicksand text-lg relative z-20 w-full border border-t-0 border-prim transition-transform focus-within:bg-modal'} />
      </div>
   );
};

export default RichText;