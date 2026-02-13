import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BlockEditable } from "./blockEditable";

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

  const html = block?.html ?? `<p>Block ${id} nebyl ještě vyplněn obsahem.</p>`;

  // Read mode (Visitor view)
  if (!session?.user) {
    return (
      <div
        className={`flex flex-col gap-4 ${className ?? ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Edit mode (client wrapper)
  return (
    <BlockEditable
      id={id}
      className={className}
      html={html}
      lastModified={block?.updatedOn ?? block?.createdOn ?? undefined}
    />
  );
}