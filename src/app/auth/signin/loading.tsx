import { Spinner } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <div className="flex w-[100%] h-[100vh] justify-center items-center">
      <Spinner size="xl" color="violet.400" />
    </div>
  );
}

export default Loading;
