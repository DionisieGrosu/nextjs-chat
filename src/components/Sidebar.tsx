"use client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Input from "./Input";
import { signOut, useSession } from "next-auth/react";
import { getConversations } from "@/utils/requests";
import { RiSettingsFill } from "react-icons/ri";
import { redirect, usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { AiFillMessage } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import Link from "next/link";
import routes from "@/utils/routes";

type Conversation = {
  name: string;
  image: string;
};
function Sidebar() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/signin");
    },
  });
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Flex className="flex-1 px-[20px] max-w-[130px]" justifyContent={"center"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="py-5 rounded-lg bg-violet-700 h-[100%] w-[100%]"
      >
        <Box className="flex justify-center flex-col items-center w-[100%]">
          <Box className="w-[50px] h-[50px] rounded-full overflow-hidden">
            {session?.user?.image ? (
              <Avatar
                src={session?.user?.image}
                alt={session?.user?.name}
                width={"50px"}
                height={"50px"}
                onLoad={() => setIsLoaded(true)}
              />
            ) : (
              <Skeleton
                width={"50px"}
                height={"50px"}
                className="rounded-full"
              />
            )}
            {!isLoaded && (
              <Skeleton
                width={"50px"}
                height={"50px"}
                className="rounded-full"
              />
            )}
          </Box>

          <Navbar
            items={[
              ...routes.map((item) => {
                if (item.link == pathname) {
                  return { ...item, isActive: true };
                }
                return item;
              }),
            ]}
          />
        </Box>
        <Box>
          <Button
            onClick={() => signOut()}
            className="!min-h-[50px] !w-[100%] !bg-transparent hover:!bg-transparent"
          >
            <Icon as={ImExit} width={"40px"} height={"40px"} color={"white"} />
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
