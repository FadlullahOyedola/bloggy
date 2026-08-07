// use require to avoid TS error when PrismaClient isn't available as a named export
const { PrismaClient } = require("@prisma/client") as { PrismaClient: any };

const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;