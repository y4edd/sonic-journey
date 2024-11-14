"use server";

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// 環境変数からJWTのシークレットキーを取得
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

// Server Actionを定義
export const savePlayHistory = async (songId: number | bigint) => {
  // cookieからログイン情報として存在するトークンを取得
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // ログインしていない場合は処理終了
  if (!token) {
    return;
  }

  try {
    // JWTを検証してペイロードを取得
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;

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
  } catch (error) {
    console.error("履歴の保存に失敗しました", error);
  }
};
