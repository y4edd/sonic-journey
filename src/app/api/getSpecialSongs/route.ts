import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import type { SpecialSongs } from "@/types/deezer";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const stringId = searchParams.get("id");
    if (!stringId) {
      throw new Error("クエリの受け渡しに失敗しました");
    }
    const id = Number(stringId);
    const SpecialSongs: SpecialSongs[] = await prisma.pick_Song.findMany({
      where: {
        pick_id: id,
      },
    });
    if (!SpecialSongs) {
      return NextResponse.json(
        { message: "特集ページのプレイリスト曲の情報が見つかりませんでした" },
        { status: 404 }
      );
    }
    return NextResponse.json(SpecialSongs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
