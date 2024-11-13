"use server";

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// 環境変数からJWTのシークレットキーを取得
const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

// Server Actionを定義
export const savePlayHistory = async (songId: number | bigint) => {
  // cookieからログイン情報は存在するトークンを取得
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

    // 既存のユーザーと楽曲の履歴を削除
    await prisma.history.deleteMany({
      where: {
        user_id: userId,
        api_song_id: songId,
      },
    });

    // ユーザーの現在の履歴数を取得
    const historyCount = await prisma.history.count({
      where: {
        user_id: userId,
      },
    });

    // 履歴が10件以上の場合、最も古い履歴を削除
    if (historyCount >= 10) {
      const oldestHistory = await prisma.history.findFirst({
        where: {
          user_id: userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (oldestHistory) {
        await prisma.history.delete({
          where: {
            id: oldestHistory.id,
          },
        });
      }
    }

    // Prismaを使用してHistoryテーブルにデータを保存
    await prisma.history.create({
      data: {
        user_id: userId,
        api_song_id: songId,
      },
    });
  } catch (error) {
    console.error("履歴の保存に失敗しました", error);
  }
};
