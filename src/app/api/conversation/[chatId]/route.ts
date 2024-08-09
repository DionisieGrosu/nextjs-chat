import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prismaClient from "@/utils/prismaClient";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse,
  { params }: { params: { chatId: string } }
) {
  let session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json(
      { success: false, message: "Unathorized!" },
      { status: 401 }
    );
  }
  let chatId = params.chatId;
  let conversation = await prismaClient.conversation.findFirst({
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

  if (!conversation) {
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, data: conversation },
    { status: 200 }
  );
}
