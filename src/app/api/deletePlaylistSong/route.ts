import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { songId, playlistId }: { songId: number; playlistId: number } =
      await req.json();
    if (!songId || !playlistId) {
      return NextResponse.json(
        { message: "削除に必要な情報が見つかりません" },
        { status: 400 }
      );
    }

    const deleteId = await prisma.playlist_Song.findFirst({
      select: { id: true },
      where: {
        api_song_id: songId,
        playlist_id: playlistId,
      },
    });

    if (!deleteId) {
      return NextResponse.json(
        { message: "削除対象の楽曲が見つかりません" },
        { status: 400 }
      );
    }
    await prisma.playlist_Song.delete({
      where: {
        id: deleteId.id,
      },
    });
    return NextResponse.json(
      { message: "プレイリストの楽曲の削除に成功しました" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバエラーが発生しました" },
      { status: 500 }
    );
  }
};
