import prismaClient from "@/utils/prismaClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  console.log("REQUEST FROM SIGNUO");
  let data = await request.json();
  console.log(data);
  try {
    if (!data.name || !data.email || !data.password || !data.confirm_password) {
      return NextResponse.json(
        { success: false, message: "Data is empty!" },
        { status: 500 }
      );
    }

    if (data.password != data.confirm_password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and Confirm password don`t match!",
        },
        { status: 500 }
      );
    }

    let salt = await bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) ?? 12);
    let hashed_password = await bcrypt.hash(data.password, salt);
    let created = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed_password,
      },
    });
    if (!created) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while trying to create user!",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: created }, { status: 200 });
  } catch (e) {
    console.log("ERROR WHILE TRYING TO CREATE USER");
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code == "P2002") {
        return NextResponse.json(
          {
            success: false,
            message: "This email already taken!",
          },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Something went wrong while trying to create user!",
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while trying to create user!",
        },
        { status: 500 }
      );
    }
  }
}
