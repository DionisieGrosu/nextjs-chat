import { Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type NavItem = {
  icon: IconType;
  isActive: boolean;
  link: string;
};
type Props = {
  items: NavItem[];
};
function Navbar({ items }: Props) {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      className={"mt-10 w-[100%]"}
    >
      {items &&
        items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.link}
              className={`block py-4 w-[100%] text-center transition-all duration-300 border-r-4 ${
                item.isActive
                  ? "border-orange-400 bg-violet-800"
                  : "border-transparent bg-transparent"
              } hover:!border-orange-400`}
            >
              <Icon
                as={item.icon}
                width={"40px"}
                height={"40px"}
                color={"white"}
              />
            </Link>
          );
        })}
    </Flex>
  );
}

export default Navbar;
