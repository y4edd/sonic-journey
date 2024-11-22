import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

type Body = {
  diffPlaylists: { playlistId: number; musicFlag: boolean }[];
  musicId: number;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: Body = await req.json();
    const diffPlaylists = body.diffPlaylists;
    const musicId = body.musicId;
    if (!body) {
      throw new Error("楽曲データの受け渡しに失敗しました");
    }

    for (let i = 0; i < diffPlaylists.length; i++) {
      if (diffPlaylists[i].musicFlag) {
        await prisma.playlist_Song.create({
          data: {
            playlist_id: diffPlaylists[i].playlistId,
            api_song_id: BigInt(musicId),
          },
        });
      }
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
