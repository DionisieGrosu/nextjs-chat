import { error } from "console";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

const options: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  logger: {
    error(code, metadata) {
      console.log({ type: "inside error logger", code, metadata });
    },
    warn(code) {
      console.log({ type: "inside warn logger", code });
    },
    debug(code, metadata) {
      console.log({ type: "inside debug logger", code, metadata });
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile, token) {
        console.log("PROFILE CHECK");
        console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("CREDENTIALS");
        let result = credentials;
        console.log(result);
        if (result?.email && result?.password) {
          let user = await prisma.user.findFirst({
            where: { email: credentials?.email },
          });
          if (!user) {
            throw new Error(
              JSON.stringify({ success: false, message: "Wrong credentials 1" })
            );
          }

          if (
            !(await bcrypt.compareSync(credentials?.password, user.password))
          ) {
            throw new Error(
              JSON.stringify({ success: false, message: "Wrong credentials 2" })
            );
          }

          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
          };
        } else {
          throw new Error(
            JSON.stringify({ success: false, message: "Wrong credentials 3" })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ session, token }) {
      console.log("SESSION");
      console.log(session);
      console.log("SESSION TOKEN");
      console.log(token);
      session.user.id = token?.sub;
      return { ...session, accessToken: token.accessToken };
    },
    async jwt({ token, account, user }) {
      console.log("USER");
      console.log(user);
      console.log("TOKEN");
      console.log(token);
      console.log("ACCOUNT");
      console.log(account);
      if (account?.access_token) {
        token.accessToken = account?.access_token;
      }
      return {
        ...token,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default options;
