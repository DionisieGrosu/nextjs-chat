import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import SessionWrapper from "@/utils/SessionProvider";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat",
  description: "Nextjs chat app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log("SESSION FROM SERVER");
  console.log(session);

  return (
    <SessionWrapper>
      <html lang="en">{children}</html>
    </SessionWrapper>
  );
}
