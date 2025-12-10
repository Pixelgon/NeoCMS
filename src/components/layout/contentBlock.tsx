import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FC } from "react";

interface ContentBlockProps {
  id: string;
}

export const ContentBlock: FC<ContentBlockProps> = async ({ id }) => {
  const session = await auth();

  if (!session || !session.user) {
   const content = await prisma.contentBlock.findUnique({
      where: { id },
    });
   return <></>;
  }
};

export default ContentBlock;
