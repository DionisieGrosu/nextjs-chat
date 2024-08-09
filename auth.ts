import options from "@/app/api/auth/[...nextauth]/options";
import NextAuth from "next-auth/next";

export const { handler, auth, signIn, signOut } = NextAuth(options);
