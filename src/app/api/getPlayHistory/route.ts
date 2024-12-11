import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
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
    // 取得する楽曲件数をクエリパラメータから取得
    const { searchParams } = request.nextUrl;
    const take = searchParams.get("take");
    // JWTを検証してペイロードを取得
    const decoded = jwt.verify(token.value, JWT_SECRET) as { id: string };
    const userId = decoded.id;

    // ログインユーザーが視聴した楽曲履歴のidを取得
    const playHistoryIds = await prisma.history.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        api_song_id: true,
      },
      take: Number(take),
    });

    // 楽曲idを返す
    const songIds = playHistoryIds.map((id) => {
      return Number(id.api_song_id);
    });

    return NextResponse.json({ songIds });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
