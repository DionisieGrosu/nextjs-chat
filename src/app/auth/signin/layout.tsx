import SessionWrapper from "@/utils/SessionProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Nextjs chat app",
};

type Props = {
  children: React.ReactNode;
};
function Layout({ children }: Readonly<Props>) {
  return (
    <body className={inter.className + " w-[100%] min-h-[100vh]"}>
      <ChakraProvider>
        <main>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </main>
      </ChakraProvider>
    </body>
  );
}

export default Layout;
