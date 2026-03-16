"use client";
import { FC, useEffect, useRef, useCallback, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Input from "./input";
import RichTextTab from "./richTextTab";
import { useLayout } from "@/context/layoutContext";
import ImageUpload from "./imageUpload";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  DocumentCheckIcon,
  LinkIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";

interface RichTextProps {
  content: string;
  onChange?: (html: string) => void;
  hideableToolbar?: boolean;
  animateToolbar?: boolean;
  label?: string;
  headingLevels?: (1 | 2 | 3)[];
  autoFocus?: boolean;
  isChanged?: boolean;
  saveBlock?: () => Promise<{ ok: boolean }>;
  resetBlock?: () => void;
}

export const RichText: FC<RichTextProps> = ({
  content,
  onChange,
  label,
  hideableToolbar,
  animateToolbar = false,
  headingLevels = [2, 3],
  autoFocus = false,
  isChanged,
  saveBlock,
  resetBlock,
}) => {
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
          levels: headingLevels,
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
      Image.configure({
        HTMLAttributes: {
          class: "w-full h-auto object-contain rounded-3xl mt-4",
        },
      }),
    ],
    [headingLevels],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChangeRef.current?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || !autoFocus) return;
    requestAnimationFrame(() => {
      editor.commands.focus("end");
    });
  }, [editor, autoFocus]);

  const lastPropContentRef = useRef<string>(content);
  useEffect(() => {
    if (!editor) return;
    if (content === lastPropContentRef.current) return;

    const current = editor.getHTML();
    if (content !== current) {
      editor.commands.setContent(content);
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
    editor
      .chain()
      .focus()
      .insertContent({
        type: "image",
        attrs: {
          src: uploadedImageUrlRef.current,
        },
      })
      .run();
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
    [editor],
  );
  const toggleItalic = useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor],
  );
  const toggleHeading = useCallback(
    (level: 1 | 2 | 3) =>
      editor?.chain().focus().toggleHeading({ level }).run(),
    [editor],
  );
  const undo = useCallback(
    () => editor?.chain().focus().undo().run(),
    [editor],
  );
  const redo = useCallback(
    () => editor?.chain().focus().redo().run(),
    [editor],
  );
  const canUndo = editor?.can().undo() ?? false;
  const canRedo = editor?.can().redo() ?? false;
  const showBottomBar = canUndo || canRedo || (isChanged && !!saveBlock);

  return (
    <>
      {label && (
        <label className="text-wh font-quicksand text-lg pl-3 pb-1">
          {label}
        </label>
      )}
      <motion.div
        className="group flex h-auto w-full max-w-full min-w-0 flex-col rounded-3xl border border-prim overflow-visible"
        {...(animateToolbar ? {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1 },
          transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
          exit: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, overflow: "hidden", filter: "blur(2px)" },
        } : {})}
      >
        <div
          className={`px-1 flex w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden bg-sec rounded-t-3xl text-prim font-quicksan border-prim ${hideableToolbar ? "max-h-0 group-focus-within:max-h-full transition-all duration-300 group-focus-within:border-b" : "border-b"} `}
          >
          <RichTextTab
            onClick={() => toggleBold()}
            isActive={editor?.isActive("bold")}
            className="font-bold"
          >
            B
          </RichTextTab>
          <RichTextTab
            onClick={() => toggleItalic()}
            isActive={editor?.isActive("italic")}
            className="italic"
          >
            I
          </RichTextTab>
          {headingLevels.map((level) => (
            <RichTextTab
              key={level}
              onClick={() => toggleHeading(level)}
              isActive={editor?.isActive("heading", { level })}
            >
              H{level}
            </RichTextTab>
          ))}
          <RichTextTab onClick={() => OpenLinkDialog()}>
            <LinkIcon className="w-5 h-5" />
          </RichTextTab>
          <RichTextTab onClick={() => OpenImageDialog()}>
            <PhotoIcon className="w-5 h-5" />
          </RichTextTab>
        </div>
        <EditorContent
          editor={editor}
          className={`g-sec relative z-20 w-full max-w-full min-w-0 overflow-hidden p-3 !outline-none text-lg text-wh font-quicksand transition-transform ${showBottomBar ? "" : "rounded-b-3xl"} [&_.ProseMirror]:w-full [&_.ProseMirror]:max-w-full [&_.ProseMirror]:min-w-0 [&_.ProseMirror]:break-words [&_.ProseMirror_*]:max-w-full [&_.ProseMirror_*]:break-words [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:max-w-full`}
        />
        {showBottomBar && (
          <div className="flex w-full max-w-full min-w-0 items-center justify-between overflow-x-auto rounded-b-3xl border-t border-prim bg-sec text-prim font-quicksand px-2">
            <div className="flex items-center">
              {canUndo && (
                <RichTextTab onClick={() => undo()} isActive={false}>
                  <ArrowUturnLeftIcon className="w-5 h-5" />
                </RichTextTab>
              )}
              {canRedo && (
                <RichTextTab onClick={() => redo()} isActive={false}>
                  <ArrowUturnRightIcon className="w-5 h-5" />
                </RichTextTab>
              )}
            </div>
            <div className="flex items-center">
              {isChanged && saveBlock && resetBlock && (
                <RichTextTab
                  onClick={resetBlock}
                  isActive={false}
                  className="text-err"
                >
                  <TrashIcon className="w-5 h-5" />
                </RichTextTab>
              )}
              {isChanged && saveBlock && (
                <RichTextTab onClick={saveBlock} isActive={false}>
                  <DocumentCheckIcon className="w-5 h-5" />
                </RichTextTab>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default RichText;
