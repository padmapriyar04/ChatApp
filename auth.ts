import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "./lib/prisma"
import authConfig from "./auth.config"
 
 
export const {auth,signIn,signOut,handlers} = NextAuth({
  callbacks : {
    async session({session,token}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }
      console.log(session);
      console.log(token);
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})