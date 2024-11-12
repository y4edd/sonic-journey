import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { message: "プレイリストの削除に成功しました" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "サーバエラーが発生しました" },
      { status: 500 }
    );
  }
};
