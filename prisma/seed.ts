
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Vytvoření tagů
  const tag1 = await prisma.tag.upsert({
    where: { name: 'Tag1' },
    update: {},
    create: {
      name: 'Tag1',
    },
  })

  const tag2 = await prisma.tag.upsert({
    where: { name: 'Tag2' },
    update: {},
    create: {
      name: 'Tag2',
    },
  })

  // Vytvoření projektu
  const project = await prisma.project.create({
    data: {
      name: 'Můj první projekt',
      body: 'Tělo projektu',
      description: 'Popis projektu',
      background: 'Pozadí projektu',
      photo: 'URL fotografie',
      slug: 'muj-prvni-projekt',
      tags: {
        create: [
          { tag: { connect: { id: tag1.id } } },
          { tag: { connect: { id: tag2.id } } },
        ],
      },
    },
  })

  console.log({ project })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })