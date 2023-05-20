import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

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
          title: "title 1",
          content: "includes rest-API",
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
      title: "title 2",
      content: "includes graphql",
      published: true,
      comments: {
        create: {
          content: "comment",
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
