import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// In Prisma 7, utilizing Next.js may force the client engine type,
// meaning we explicitly require a Driver Adapter.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Ensure we don't crash the entire app if the adapter fails (e.g., missing DATABASE_URL)
let prismaInstance: PrismaClient;

try {
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 1 // Crucial for serverless environments
  });
  const adapter = new PrismaPg(pool);
  prismaInstance = globalForPrisma.prisma || new PrismaClient({ adapter });
} catch (error) {
  console.error("Prisma Initialization Error:", error);
  // Fallback to a plain client if adapter fails - may still fail but prevents immediate startup crash
  prismaInstance = globalForPrisma.prisma || new PrismaClient();
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
