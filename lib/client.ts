import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || 
  new PrismaClient(
    process.env.NODE_ENV === 'production' 
      ? { 
          adapter: new PrismaNeon({ 
            connectionString: `${process.env.POSTGRES_PRISMA_URL}` 
          }) 
        }
      : undefined
  );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
