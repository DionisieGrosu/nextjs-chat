import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import authOptions from "../auth/[...nextauth]/route";
import prismaClient from "@/utils/prismaClient";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json(
      { success: false, message: "Unathorized!" },
      { status: 401 }
    );
  }

  console.log("USER CONVERSATIONS 2");
  console.log(session);
  let conversations = await prismaClient.conversation.findMany({
    where: {
      users: {
        some: {
          id: session?.user?.id,
        },
      },
    },
    include: {
      users: {
        where: {
          id: {
            not: session?.user?.id,
          },
        },
      },
    },
  });

  console.log("CONVERSATIONS");
  console.log(conversations);
  return NextResponse.json(
    { success: true, data: conversations },
    { status: 200 }
  );
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  let session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json(
      { success: false, message: "Unathorized!" },
      { status: 401 }
    );
  }

  let conversation = await prismaClient.conversation.create({
    data: {
      name: session?.user?.name,
      users: session?.user?.id,
    },
  });

  if (!conversation) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while trying to create conversation!",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, data: conversation },
    { status: 201 }
  );
}
