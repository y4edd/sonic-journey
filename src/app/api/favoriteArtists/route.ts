import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  artistId: number;
};

export const GET = async (req: NextRequest) => {
  try {
    // NOTE: ログインユーザーの確認
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    // NOTE: DBからお気に入りアーティストを取得する
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

    // NOTE: お気に入りアーティストが登録されていない場合は空の配列を返す
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

export const POST = async (req: NextRequest) => {
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

    const body: Body = await req.json();
    const artistId = body.artistId;

    if (!body || typeof artistId === "undefined") {
      NextResponse.json({ message: "アーティストの取得に失敗しました" }, { status: 400 });
    }

    await prisma.favorite_Artist.create({
      data: {
        user_id: userId,
        api_artist_id: BigInt(artistId),
      },
    });

    return NextResponse.json(
      { message: "お気に入りアーティストに追加されました" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
