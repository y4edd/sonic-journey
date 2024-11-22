import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const music_id = searchParams.get("music_id");
    if (!user_id || !music_id) {
      throw new Error("クエリの受け渡しに失敗しました");
    }

    const bigMusic_id = BigInt(music_id);

    const userPlaylist_ids: { id: number }[] = await prisma.playlist.findMany({
      select: {
        id: true,
      },
      where: {
        user_id: user_id,
      },
    });

    let musicPlaylists: { playlist_id: number; music_flag: boolean }[] = [];
    for (const userPlaylist_id of userPlaylist_ids) {
      const musicPlaylist = await prisma.playlist_Song.findFirst({
        select: {
          playlist_id: true,
        },
        where: {
          api_song_id: bigMusic_id,
          playlist_id: userPlaylist_id.id,
        },
      });
      if (musicPlaylist) {
        musicPlaylists = [
          ...musicPlaylists,
          { playlist_id: musicPlaylist.playlist_id, music_flag: true },
        ];
      } else {
        musicPlaylists = [
          ...musicPlaylists,
          { playlist_id: userPlaylist_id.id, music_flag: false },
        ];
      }
    }

    return NextResponse.json(musicPlaylists, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバエラーが発生しました" }, { status: 500 });
  }
};
