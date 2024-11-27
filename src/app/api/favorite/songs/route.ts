import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

// ログインユーザーのお気に入り楽曲を取得します。
// お気に入り楽曲のidを配列で返します。お気に入り楽曲が無いときは空の配列を返します。
// リクエストヘッダーのcookieにログイン認証で使うtokenが必要です。
export const GET = async (req: NextRequest) => {
  try {
    // ログインユーザーのidを取得する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    // DBからお気に入り楽曲を取得する
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

// ログインユーザーのお気に入り楽曲をDBに保存します。
// リクエストヘッダーのcookieにログイン認証で使うtokenが必要です。
// リクエストボディに楽曲idが必要です。
export const POST = async (req: NextRequest) => {
  try {
    // ログインユーザーのidを取得する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    // リクエストに楽曲idが存在するか確認する
    const { songId } = await req.json();
    if (!songId) {
      return NextResponse.json({ message: "リクエストボディに楽曲idが必要です" }, { status: 400 });
    }

    // DBにお気に入り楽曲が存在するか確認する
    const favoriteSongRecord = await prisma.favorite_Song.findFirst({
      where: {
        user_id: userId,
        api_song_id: songId,
      },
    });

    if (favoriteSongRecord) {
      return NextResponse.json({ message: "既に登録済みです" }, { status: 409 });
    }

    // DBにお気に入り楽曲を追加する
    await prisma.favorite_Song.create({
      data: {
        user_id: userId,
        api_song_id: BigInt(songId),
      },
    });

    return NextResponse.json({ message: "お気に入り楽曲に追加されました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};

// ログインユーザーのお気に入り楽曲を削除します。
// リクエストヘッダーのcookieにログイン認証で使うtokenが必要です。
// リクエストボディに楽曲idの配列が必要です。
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
    if (!songIds.length) {
      return NextResponse.json({ message: "削除対象の楽曲idが必要です" }, { status: 400 });
    }

    // DBからお気に入り楽曲を削除する
    await prisma.favorite_Song.deleteMany({
      where: {
        user_id: userId,
        api_song_id: {
          in: songIds,
        },
      },
    });

    return NextResponse.json({ message: "お気に入り楽曲の削除に成功しました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
