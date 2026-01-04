"use client";
import { FC, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Input from "./input";
import RichTextTab from "./richTextTab";
import { useLayout } from "@/context/layoutContext";
import ImageUpload from "./imageUpload";

interface RichTextProps {
  content: string;
  onChange?: (html: string) => void;
  hideableToolbar?: boolean;
  label?: string;
}

export const RichText: FC<RichTextProps> = ({ content, onChange, label, hideableToolbar }) => {
  const linkUrlRef = useRef<string>("");
  const uploadedImageUrlRef = useRef<string>("");
  const layoutData = useLayout();

  const onChangeRef = useRef<RichTextProps["onChange"]>(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const extensions = useMemo(
    () => [
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
    []
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChangeRef.current?.(editor.getHTML());
    },
  });

  const lastPropContentRef = useRef<string>(content);
  useEffect(() => {
    if (!editor) return;
    if (content === lastPropContentRef.current) return; // No change

    const current = editor.getHTML();
    if (content !== current) {
      editor.commands.setContent(content, false);
    }

    lastPropContentRef.current = content;
  }, [content, editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    const href = (linkUrlRef.current || "").trim();
    if (!href) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    linkUrlRef.current = "";
  }, [editor]);

  const insertUploadedImage = useCallback(() => {
    if (!uploadedImageUrlRef.current || !editor) return;
    editor.chain().focus().setImage({ src: uploadedImageUrlRef.current }).run();
    uploadedImageUrlRef.current = "";
  }, [editor]);

  const OpenLinkDialog = useCallback(() => {
    linkUrlRef.current = "";

    layoutData.showDialog({
      upperPart: (
        <Input
          type="url"
          onChange={(e) => {
            linkUrlRef.current = e.target.value;
          }}
          uncontrolled
          defaultValue="https://"
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
      btnL: {
        text: "Zrušit",
        onClick: () => {
          linkUrlRef.current = "";
          layoutData.closeDialog();
        },
      },
    });
  }, [applyLink, layoutData]);

  const OpenImageDialog = useCallback(() => {
    // Reset state
    uploadedImageUrlRef.current = "";
    layoutData.showDialog({
      upperPart: (
        <ImageUpload
          id="rich-image-upload"
          name="rich-image-upload"
          label="Nahrát obrázek"
          value={uploadedImageUrlRef.current}
          onChange={(url) => {
            uploadedImageUrlRef.current = url;
          }}
        />
      ),
      btnR: {
        text: "Vložit obrázek",
        onClick: () => {
          insertUploadedImage();
          layoutData.closeDialog();
        },
      },
      btnL: {
        text: "Zrušit",
        onClick: () => {
          layoutData.closeDialog();
          uploadedImageUrlRef.current = "";
        },
      },
    });
  }, [insertUploadedImage, layoutData]);

  const toggleBold = useCallback(
    () => editor?.chain().focus().toggleBold().run(),
    [editor]
  );
  const toggleItalic = useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor]
  );
  const toggleH2 = useCallback(
    () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    [editor]
  );
  const toggleH3 = useCallback(
    () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    [editor]
  );
  const undo = useCallback(
    () => editor?.chain().focus().undo().run(),
    [editor]
  );
  const redo = useCallback(
    () => editor?.chain().focus().redo().run(),
    [editor]
  );

  return (
    <>
      {
        label && <label className="text-wh font-quicksand text-lg pl-3 pb-1">{label}</label>
      }
    <div className="flex flex-col group rounded-3xl border border-prim overflow-hidden">
      <div className={`flex bg-sec text-prim font-quicksand overflow-auto border-prim ${hideableToolbar ? 'max-h-0 group-focus-within:max-h-10 transition-all duration-300 group-focus-within:border-b ' : 'border-b'} `}>
        <RichTextTab
          onClick={() => toggleBold()}
          isActive={editor?.isActive("bold")}
          className="pl-4"
          >
          B
        </RichTextTab>
        <RichTextTab
          onClick={() => toggleItalic()}
          isActive={editor?.isActive("italic")}
          >
          I
        </RichTextTab>
        <RichTextTab
          onClick={() => toggleH2()}
          isActive={editor?.isActive("heading", { level: 2 })}
          >
          H2
        </RichTextTab>
        <RichTextTab
          onClick={() => toggleH3()}
          isActive={editor?.isActive("heading", { level: 3 })}
          >
          H3
        </RichTextTab>
        <RichTextTab onClick={() => OpenLinkDialog()}>Link</RichTextTab>
        <RichTextTab onClick={() => OpenImageDialog()}>Obrázek</RichTextTab>
        <RichTextTab onClick={() => undo()} isActive={false}>
          ↩ Undo
        </RichTextTab>
        <RichTextTab onClick={() => redo()} isActive={false}>
          ↪ Redo
        </RichTextTab>
      </div>
      <EditorContent
        editor={editor}
        className="g-sec p-3 !outline-none text-wh font-quicksand text-lg relative z-20 w-full transition-transform"
        />
    </div>
    </>
  );
};

export default RichText;
