import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  try {
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({
        message: "ユーザー情報が正しく渡されませんでした",
      });
    }

    const playlist = await prisma.playlist.findMany({
      where: {
        user_id: user_id,
      },
    });
    return NextResponse.json(playlist, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
