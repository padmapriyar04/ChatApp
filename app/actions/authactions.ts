"use server";

import { AuthError, User } from "next-auth";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerschema";
import { ActionResult } from "@/lib/types";
import { LoginSchema } from "@/lib/schemas/loginschema";
import { authhandler } from "@/auth";

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

    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function signInUser(
  data: LoginSchema,
): Promise<ActionResult<string>> {
  try {
    const result = await authhandler.signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);

    if (result === null) {
      return { status: "error", error: "Password Incorrect" };
    }

    return { status: "success", data: "Logged In" };
  } catch (error) {
    // console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something went wrong" };
    }
  }
}
