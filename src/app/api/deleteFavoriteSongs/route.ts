import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    // ログインしているか確認する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    // リクエストに削除対象が存在するか確認する
    const { songIds } = await req.json();
    if(!songIds.length) {
      return NextResponse.json({ message: "削除対象の楽曲idが必要です"}, {status: 400 })
    }

    // DBからお気に入り楽曲を削除する
    await prisma.favorite_Song.deleteMany({
      where: {
        user_id: userId,
        api_song_id: {
          in: songIds
        },
      },
    });

    return NextResponse.json({ message: "お気に入り楽曲の削除に成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
