"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Chats from "@/components/Chats";
import Messages from "@/components/Messages";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/signin");
    },
  });

  return (
          <>
            <Chats />
            <Messages />
          </>
  );
}
