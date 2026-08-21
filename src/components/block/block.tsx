import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlockContent } from "./blockContent";
import { sanitizeRichHtml } from "@/lib/richHtml";

interface BlockProps {
  id: string;
  className?: string;
}

export default async function Block({ id, className }: BlockProps) {
  const session = await auth();

  const block = await prisma.block.findUnique({
    where: { id },
    select: { id: true, html: true, createdOn: true, updatedOn: true },
  });

  const html = sanitizeRichHtml(
    block?.html ?? `<p>Block ${id} nebyl ještě vyplněn obsahem.</p>`,
  );

  return (
    <BlockContent
      id={id}
      className={className}
      html={html}
      isEditable={Boolean(session?.user)}
      lastModified={block?.updatedOn ?? block?.createdOn ?? undefined}
    />
  );
}
