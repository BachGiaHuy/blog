import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const posts = await prisma.post.findMany();
    console.log("SUCCESS. Posts count:", posts.length);
  } catch(e) {
    console.log("ERROR:", e);
  }
}
main().finally(() => prisma.$disconnect());
