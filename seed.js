import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("NO USERS FOUND! CANNOT CREATE POST.");
    return;
  }
  
  const post = await prisma.post.create({
    data: {
      title: "Bài viết tự động từ AI",
      slug: "bai-viet-tu-dong-tu-ai-" + Date.now(),
      content: "Đây là bài viết test để chứng minh database hoạt động.",
      excerpt: "Một đoạn văn ngắn cắt.",
      coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      level: "BASIC",
      published: true,
      authorId: user.id
    }
  });
  console.log("SUCCESSFULLY INSERTED POST:", post.title);
}
main().finally(() => prisma.$disconnect());
