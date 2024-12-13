import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  userId: string;
};

// お気に入り楽曲の取得
export const POST = async (req: NextRequest) => {
  try {
    // NOTE: ログインユーザーのidを取得する
    const body: Body = await req.json();
    const userId = body.userId;
    if(!userId) {
      return NextResponse.json({ message: "未ログインです" }, { status: 401 })
    }

    // NOTE: DBからお気に入り楽曲を取得する
    const favoriteSongs = await prisma.favorite_Song.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        api_song_id: true,
        updatedAt: true,
      },
    });

    // NOTE: お気に入り楽曲が登録されていない場合は空の配列を返す
    if (!favoriteSongs.length) {
      return NextResponse.json({ resultData: [] }, { status: 200 });
    }

    const resultData = favoriteSongs.map((song) => {
      return {
        songId: Number(song.api_song_id),
        updatedAt: song.updatedAt,
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
