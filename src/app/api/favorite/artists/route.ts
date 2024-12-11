import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

// ログインユーザーのお気に入りアーティストを取得します。
// お気に入りアーティストのidを配列で返します。お気に入りアーティストが無いときは空の配列を返します。
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

    // DBからお気に入りアーティストを取得する
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

// ログインユーザーのお気に入りアーティストをDBに保存します。
// リクエストヘッダーのcookieにログイン認証で使うtokenが必要です。
// リクエストボディにアーティストidが必要です。
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

    // リクエストにアーティストidが存在するか確認する
    const { artistId } = await req.json();
    if (!artistId) {
      return NextResponse.json(
        { message: "リクエストボディにアーティストidが必要です" },
        { status: 400 },
      );
    }

    // DBにお気に入りアーティストが存在するか確認する
    const favoriteArtistRecord = await prisma.favorite_Artist.findFirst({
      where: {
        user_id: userId,
        api_artist_id: artistId,
      },
    });

    if (favoriteArtistRecord) {
      return NextResponse.json({ message: "既に登録済みです" }, { status: 409 });
    }

    // DBにお気に入りアーティストを追加する
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

// ログインユーザーのお気に入りアーティストを削除します。
// リクエストヘッダーのcookieにログイン認証で使うtokenが必要です。
// リクエストボディにアーティストidの配列が必要です。
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
    const { artistIds } = await req.json();
    if (!artistIds.length) {
      return NextResponse.json({ message: "削除対象のアーティストidが必要です" }, { status: 400 });
    }

    // DBからお気に入りアーティストを削除する
    await prisma.favorite_Artist.deleteMany({
      where: {
        user_id: userId,
        api_artist_id: {
          in: artistIds,
        },
      },
    });

    return NextResponse.json(
      { message: "お気に入りアーティストの削除に成功しました" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
