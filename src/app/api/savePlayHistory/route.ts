import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  // 環境変数からJWTのシークレットキーを取得
  const JWT_SECRET = process.env.JWT_SECRET_KEY;

  if (!JWT_SECRET) {
    return NextResponse.json({ message: "権限がありません" }, { status: 401 });
  }

  // リクエストオブジェクトからクッキーを取得
  const token = request.cookies.get("token");

  // トークンがなかった場合
  if (!token) {
    return NextResponse.json(
      { message: "再生履歴の保存にはログインが必要です。" },
      { status: 200 },
    );
  }

  try {
    // JWTを検証してペイロードを取得
    const decoded = jwt.verify(token.value, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    // bodyから楽曲idを取得
    const body = await request.json();
    const songId = body.songId;

    // songIdが存在しない、また数値でなかった場合
    if (!songId || Number.isNaN(songId)) {
      return NextResponse.json({ message: "有効な楽曲IDが必要です" }, { status: 400 });
    }

    // 既存のユーザーと楽曲の履歴を削除（重複防止）
    await prisma.history.deleteMany({
      where: {
        user_id: userId,
        api_song_id: songId,
      },
    });

    // Prismaを使用してHistoryテーブルにデータを保存
    await prisma.history.create({
      data: {
        user_id: userId,
        api_song_id: songId,
      },
    });

    // ユーザーの履歴を最新順に取得し、10件を超える古い履歴を削除
    const historiesToDelete = await prisma.history.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: 10,
      select: {
        id: true,
      },
    });

    // 10件を超えたユーザーの履歴を削除
    if (historiesToDelete.length > 0) {
      const idsDelete = historiesToDelete.map((history) => history.id);
      await prisma.history.deleteMany({
        where: {
          id: { in: idsDelete },
        },
      });
    }

    return NextResponse.json({ message: "試聴履歴が保存されました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
  }
};
