import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();
async function main() {
   await prisma.user.create({
      data: {
         name: "pixel",
         email: "mm@pixelgon.cz",
      },
   });
}

main()
   .catch((e) => {
      throw e;
   })
   .finally(async () => {
      await prisma.$disconnect();
   });