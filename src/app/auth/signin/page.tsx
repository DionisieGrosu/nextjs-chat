"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import styles from "./style.module.css";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

function SignIn() {
  const { data: session,status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      redirect("/");
    }
  }, [session]);

  const handleGoolgeAuth = async () => {
    setLoading(true);
    setErrors(false);
    try {
      let result = await signIn("google");
      console.log("RESILT FROM GOOGLE AUTH");
      console.log(result);
    } catch (e: any) {
      console.log("ERROR FROM GOOGLE AUTH");
      console.log(e);
      setLoading(false);
      setErrors(true);
      toast.error("Something went wrong");
    }
  };
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErrors(false);
    try {
      let data: any = {};
      formData.forEach((value: FormDataEntryValue, key: string) => {
        data[key] = value;
      });
      let result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      setLoading(false);
      if (result?.error) {
        let error = JSON.parse(result?.error);
        setErrors(true);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.success("Loged in successfuly");
        }
      }
    } catch (e: any) {
      setLoading(false);
      setErrors(true);
      toast.error("Something went wrong");
    }
  };

  if (status == "loading") {
    return <Loading />;
  } else {
    return (
      <Flex alignItems="center" justifyContent={"center"} w="100vw" h="100vh">
        <Box as="form" action={handleSubmit}>
          <FormControl
            bg="white"
            w="600px"
            maxW={"500px"}
            p={4}
            borderRadius="lg"
            boxShadow={"lg"}
            className={styles.box}
          >
            <Heading
              as="h1"
              size="2xl"
              textAlign={"center"}
              bgGradient={"linear(to-bl, #7928CA, #FF0080)"}
              bgClip="text"
              style={{ lineHeight: "60px" }}
            >
              Signin
            </Heading>
            <Stack spacing={3} mt={"40px"}>
              <Input
                type="tedt"
                name="email"
                borderColor={errors ? "red" : "gray.300"}
                placeholder="Email"
                size="lg"
              />
              <Input
                type="password"
                name="password"
                borderColor={errors ? "red" : "gray.300"}
                placeholder="Password"
                size="lg"
              />
              <Button type={"submit"} isLoading={loading} colorScheme="blue">
                Sign in
              </Button>
            </Stack>
            <Button
              mt={"10px"}
              type={"button"}
              onClick={handleGoolgeAuth}
              isLoading={loading}
              colorScheme="red"
            >
              Google
            </Button>
            <Text mt={"20px"} w={"100%"} textAlign={"center"}>
              Don`t have accout?{" "}
              <Link className={styles.link} href="/auth/signup">
                Sign up
              </Link>
            </Text>
          </FormControl>
        </Box>
      </Flex>
    );
  }
}

export default SignIn;
