import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  deleteSubmitPlaylists: { playlist_id: number }[];
  music_id: number;
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body: Body = await req.json();
    const deletePlaylists = body.deleteSubmitPlaylists;
    const music_id = body.music_id;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    for (let i = 0; i < deletePlaylists.length; i++) {
      const submitCheck = await prisma.playlist_Song.findFirst({
        select: { id: true },
        where: {
          playlist_id: deletePlaylists[i].playlist_id,
          api_song_id: BigInt(music_id),
        },
      });

      if (submitCheck) {
        await prisma.playlist_Song.delete({
          where: {
            // playlist_id: deletePlaylists[i].playlist_id,
            // api_song_id: BigInt(music_id),
            id: submitCheck.id,
          },
        });
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
