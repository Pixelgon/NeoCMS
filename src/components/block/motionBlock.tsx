import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripTrailingEmptyParagraphs } from "@/lib/blockHtml";
import { BlockContent } from "./blockContent";
import type { BlockMotionProps } from "@/types/blockType";

interface MotionBlockProps {
  id: string;
  className?: string;
  motionProps?: BlockMotionProps;
}

export default async function MotionBlock({
  id,
  className,
  motionProps,
}: MotionBlockProps) {
  const session = await auth();

  const block = await prisma.block.findUnique({
    where: { id },
    select: { id: true, html: true, createdOn: true, updatedOn: true },
  });

  const html = stripTrailingEmptyParagraphs(
    block?.html ?? `<p>Block ${id} nebyl ještě vyplněn obsahem.</p>`,
  );

  return (
    <BlockContent
      id={id}
      className={className}
      html={html}
      isEditable={Boolean(session?.user)}
      lastModified={block?.updatedOn ?? block?.createdOn ?? undefined}
      motionProps={motionProps}
    />
  );
}
