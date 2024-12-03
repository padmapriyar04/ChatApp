// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as {prisma : PrismaClient}

// export const prisma = globalForPrisma || new PrismaClient({log:['query']});

// if(process.env.NODE_ENV !== "production"){
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from "@prisma/client";

// Explicitly type the global object
declare global {
  var prisma: PrismaClient | undefined;
}

// Use the existing global instance or create a new one
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// Prevent creating multiple Prisma Client instances in development
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
