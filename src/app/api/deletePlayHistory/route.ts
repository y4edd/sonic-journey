import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "再生履歴が見つかりません" });
    }
    await prisma.history.deleteMany({
      where: {
        user_id: userId,
      },
    });
    return NextResponse.json({ message: "再生履歴の削除に成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
