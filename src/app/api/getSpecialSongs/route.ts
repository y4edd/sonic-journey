import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import type { PrismaSpecialSongs, SpecialSongs } from "@/types/deezer";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const stringId = searchParams.get("id");
    if (!stringId) {
      throw new Error("クエリの受け渡しに失敗しました");
    }
    const id = Number(stringId);

    // DBからデータ取得（song_api_id:BigInt）
    const specialSongs: PrismaSpecialSongs[] = await prisma.pick_Song.findMany({
      where: {
        pick_id: id,
      },
    });
    if (!specialSongs) {
      return NextResponse.json(
        { message: "特集ページのプレイリスト曲の情報が見つかりませんでした" },
        { status: 404 }
      );
    }
    const numSpecialSongs: SpecialSongs[] = [];

    // song_api_idをnumberに変換
    specialSongs.map((specialSong, index) => {
      numSpecialSongs[index] = {
        id: specialSong.id,
        pick_id: specialSong.pick_id,
        api_song_id: Number(specialSong.api_song_id),
      };
    });

    return NextResponse.json(numSpecialSongs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
