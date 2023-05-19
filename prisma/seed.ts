import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seedUser = await prisma.user.upsert({
    where: { id: "tempId" },
    update: {},
    create: {
      email: "jw9491@gmail.com",
      name: "이진호",
      password: "default",
      posts: {
        create: {
          title: "seed Post",
          content: "seed Content",
          published: true,
        },
      },
    },
  });

  const userId = seedUser.id;
  const seedPost = await prisma.post.upsert({
    where: { id: "temp" },
    update: {},
    create: {
      authorId: userId,
      title: "bold nine title",
      content: "bold nine content",
      published: true,
      comments: {
        create: {
          content: "bold nine comment",
        },
      },
    },
  });
  console.log("Prisma seed : ", { seedUser, seedPost });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
