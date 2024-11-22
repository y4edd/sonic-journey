import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  music_id: number;
};

export const POST = async (req: NextRequest) => {
  try {
    // NOTE: ログインユーザーのidを取得する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }
    const body: Body = await req.json();
    const music_id = body.music_id;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    // NOTE: DBにお気に入り楽曲を追加する
    await prisma.favorite_Song.create({
      data: {
        user_id: userId,
        api_song_id: BigInt(music_id),
      },
    });

    return NextResponse.json({ message: "お気に入り楽曲に追加されました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
