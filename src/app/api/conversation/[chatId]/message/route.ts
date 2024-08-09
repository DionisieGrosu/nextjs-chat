import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/route";
import prismaClient from "@/utils/prismaClient";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { chatId: string } }
) {
  const session = await getServerSession(authOptions);

  const chatId = params.chatId;
  if (!session || !session?.user || !chatId) {
    return res.status(401).json({ success: false, message: "Unathorized!" });
  }

  let messages = await prismaClient.conversation.findFirst({
    where: {
      id: chatId,
      users: {
        some: {
          id: session?.user?.id,
        },
      },
    },
    include: {
      messages: true,
      users: true,
    },
  });

  if (!messages) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  return res.status(200).json({ success: true, data: messages });
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { chatId: string } }
) {
  const session = await getServerSession(authOptions);

  const chatId = params.chatId;
  if (!session || !session?.user || !chatId) {
    return res.status(401).json({ success: false, message: "Unathorized!" });
  }
  let message = req?.body?.message;

  if (!message) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }

  let createdMessage = await prismaClient.message.create({
    data: {
      body: message,
      senderId: session?.user?.id,
      conversationId: chatId,
    },
  });

  if (!createdMessage) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while trying to create message!",
      });
  }

  let messages = await prismaClient.conversation.findFirst({
    where: {
      id: chatId,
      users: {
        some: {
          id: session?.user?.id,
        },
      },
    },
    include: {
      messages: true,
      users: true,
    },
  });
  return res.status(200).json({ success: true, data: messages });
}
