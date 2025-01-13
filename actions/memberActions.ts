"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getMembers() {
  const session = await auth();
  if(!session?.user){
    return null;
  }
  try {
    const data = await prisma.member.findMany({
      where: {
        NOT: {
          id: session?.user?.id,
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberById(id: string) {
  try {
    const data = await prisma.member.findUnique({
      where: { 
        userId: id
       },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}