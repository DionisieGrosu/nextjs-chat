import React, { SetStateAction } from "react";
import { Input } from "@chakra-ui/react";

function InputComponent({
  placeholder = "",
  value = "",
  className = "",
  onInput = Dispatch<SetStateAction<string>>,
}) {
  return (
    <Input
      className={
        "!bg-gray-100 !border-none text-[14px] text-gray-500" + " " + className
      }
      paddingX={"20px"}
      paddingY={"25px"}
      placeholder={placeholder}
      value={value}
      onInput={(value) => onInput(value?.currentTarget?.value ?? "")}
    />
  );
}

export default InputComponent;
