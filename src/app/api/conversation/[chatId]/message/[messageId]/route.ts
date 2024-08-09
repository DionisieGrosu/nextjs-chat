import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../../../auth/[...nextauth]/route";
import prismaClient from "@/utils/prismaClient";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { chatId: string; messageId: string } }
) {
  const session = await getServerSession(authOptions);

  const chatId = params.chatId;
  const messageId = params.messageId;
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
      messages: {
        where: {
          id: messageId,
        },
      },
      users: true,
    },
  });

  if (!messages) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  return res.status(200).json({ success: true, data: messages });
}
