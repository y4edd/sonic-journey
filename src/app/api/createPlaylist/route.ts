import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { name, user_id } = await req.json();

    await prisma.playlist.create({
      data: {
        user_id: user_id,
        name: name,
      },
    });

    return NextResponse.json(
      { message: "プレイリストの作成が成功しました" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
