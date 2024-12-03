"use server";

import { User } from "next-auth";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerschema";
import { ActionResult } from "@/lib/types";

export async function registerUser(
  data: RegisterSchema,
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedpassword = await bcrypt.hash(password, 10);

    const existinguser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existinguser) {
      return { status: "error", error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedpassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);

    return { status: "error", error: "Something went wrong" }
  }
}
