import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "プレイリストIDが見つかりません" });
    }
    await prisma.playlist.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "プレイリストの削除に成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
