import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  diffPlaylists: { playlist_id: number; music_flag: boolean }[];
  music_id: number;
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body: Body = await req.json();
    const diffPlaylists = body.diffPlaylists;
    const music_id = body.music_id;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }
    for (let i = 0; i < diffPlaylists.length; i++) {
      if (!diffPlaylists[i].music_flag) {
        const submitCheck = await prisma.playlist_Song.findFirst({
          where: {
            playlist_id: diffPlaylists[i].playlist_id,
            api_song_id: BigInt(music_id),
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

    return NextResponse.json(
      { message: "プレイリストから楽曲が削除されました" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "サーバエラーが発生しました" },
      { status: 500 }
    );
  }
};
