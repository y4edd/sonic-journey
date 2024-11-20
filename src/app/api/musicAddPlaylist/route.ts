import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  addSubmitPlaylists: { playlist_id: number }[];
  music_id: number;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: Body = await req.json();
    const addPlaylists = body.addSubmitPlaylists;
    const music_id = body.music_id;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    for (let i = 0; i < addPlaylists.length; i++) {
      const submitCheck = await prisma.playlist_Song.findFirst({
        where: {
          playlist_id: addPlaylists[i].playlist_id,
          api_song_id: BigInt(music_id),
        },
      });
      if (submitCheck) {
        continue;
      }

      await prisma.playlist_Song.create({
        data: {
          playlist_id: addPlaylists[i].playlist_id,
          api_song_id: BigInt(music_id),
        },
      });
    }

    return NextResponse.json(
      { message: "プレイリストに楽曲が追加されました" },
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
