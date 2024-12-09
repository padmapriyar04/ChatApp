import type { NextAuthConfig, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { loginSchema } from "./lib/schemas/loginschema";
import { getUserByEmail } from "./app/actions/authactions";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);

          if (!user || !(await compare(password, user.passwordHash))) {
            return null;
          }

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
