import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  userId: {id: string};
}

// お気に入り楽曲の取得
export const POST = async (req: NextRequest) => {
  try {
    // NOTE: ログインユーザーのidを取得する
    const body:Body = await req.json();
    const userId =body.userId.id;

    // NOTE: DBからお気に入り楽曲を取得する
    const favoriteArtists = await prisma.favorite_Artist.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        api_artist_id: true,
        updatedAt: true,
      },
    });

    // NOTE: お気に入り楽曲が登録されていない場合は空の配列を返す
    if (!favoriteArtists.length) {
      return NextResponse.json({ resultData: [] }, { status: 200 });
    }

    const resultData = favoriteArtists.map((artist) => {
      return {
        artistId: Number(artist.api_artist_id),
        updatedAt: artist.updatedAt,
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
