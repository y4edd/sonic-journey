import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { id, name, user_id }: { id: number; name: string; user_id: string } = await req.json();

    const sameTitleCheck = await prisma.playlist.findFirst({
      where: {
        user_id: user_id,
        name: name,
      },
    });
    if (sameTitleCheck) {
      return NextResponse.json(
        { message: "同名のプレイリストが作成されています" },
        { status: 409 },
      );
    }

    await prisma.playlist.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({ message: "プレイリスト名の変更が完了しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
