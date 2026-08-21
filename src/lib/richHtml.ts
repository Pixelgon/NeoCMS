import sanitizeHtml from "sanitize-html";
import { stripTrailingEmptyParagraphs } from "@/lib/blockHtml";

const RICH_TEXT_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "s",
    "strike",
    "h1",
    "h2",
    "h3",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "hr",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel", "class"],
    img: ["src", "alt", "title", "class"],
    ol: ["start"],
    li: ["value"],
    code: ["class"],
  },
  allowedClasses: {
    a: [
      "font-quicksand",
      "bg-pxlgn-gradient",
      "text-transparent",
      "bg-clip-text",
      "hover:brightness-75",
      "transition-all",
      "duration-300",
    ],
    img: ["w-full", "h-auto", "object-contain", "rounded-3xl", "mt-4"],
    code: ["language-*"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: {
    img: ["http", "https"],
  },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attributes) => {
      const { target, rel: _rel, ...safeAttributes } = attributes;

      if (target !== "_blank") {
        return { tagName, attribs: safeAttributes };
      }

      return {
        tagName,
        attribs: {
          ...safeAttributes,
          target: "_blank",
          rel: "external nofollow noopener noreferrer",
        },
      };
    },
  },
};

export const sanitizeRichHtml = (html: unknown) => {
  if (typeof html !== "string") return "";

  return stripTrailingEmptyParagraphs(sanitizeHtml(html, RICH_TEXT_OPTIONS));
};
