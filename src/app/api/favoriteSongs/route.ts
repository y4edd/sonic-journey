import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  musicId: number;
};

// お気に入り楽曲の取得
export const GET = async (req: NextRequest) => {
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

// お気に入り楽曲の追加
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
    const musicId = body.musicId;
    if (!body || typeof musicId === "undefined") {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    // NOTE: DBにお気に入り楽曲を追加する
    await prisma.favorite_Song.create({
      data: {
        user_id: userId,
        api_song_id: BigInt(musicId),
      },
    });

    return NextResponse.json({ message: "お気に入り楽曲に追加されました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
