import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface BlockProps {
  id: string;
  className?: string;
}
export default async function Block({ id, className }: BlockProps) {
  const session = await auth();

  const block = await prisma.block.findUnique({
    where: { id },
  });

  if (session && session.user) {
    return (
      <p>Edit mode.</p>
    );
  } else {
    return (
      <div
        className={`flex flex-col gap-4 ${className}`}
        dangerouslySetInnerHTML={{
          __html: block ? block.html : `<p>Block ${id} neexistuje.</p>`,
        }}
      ></div>
    );
  }
}
