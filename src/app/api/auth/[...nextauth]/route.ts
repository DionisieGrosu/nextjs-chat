// import NextAuth from "next-auth";
// import options from "./options";
// import { handler } from "./../../../../auth";

// export { handler as GET, handler as POST };

import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import options from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

export default handler;
