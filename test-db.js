import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({ connectionString: "postgresql://postgres.uptythhoxklhygmryxmx:-04n2Z0wD@rM&J$@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true" });
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
