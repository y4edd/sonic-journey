import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  diffPlaylists: { playlistId: number; musicFlag: boolean }[];
  musicId: number;
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body: Body = await req.json();
    const diffPlaylists = body.diffPlaylists;
    const musicId = body.musicId;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    for (const ele of diffPlaylists) {
      if (!ele.musicFlag) {
        const submitCheck = await prisma.playlist_Song.findFirst({
          where: {
            playlist_id: ele.playlistId,
            api_song_id: BigInt(musicId),
          },
        });
        if (submitCheck) {
          await prisma.playlist_Song.delete({
            where: {
              id: submitCheck.id,
            },
          });
        }
      }
    }

    return NextResponse.json({ message: "プレイリストから楽曲が削除されました" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "サーバエラーが発生しました" }, { status: 500 });
  }
};
