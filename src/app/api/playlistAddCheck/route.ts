import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const musicId = searchParams.get("musicId");
    if (!userId || !musicId) {
      throw new Error("クエリの受け渡しに失敗しました");
    }

    const bigMusicId = BigInt(musicId);

    const userPlaylistIds: { id: number }[] = await prisma.playlist.findMany({
      select: {
        id: true,
      },
      where: {
        user_id: userId,
      },
    });

    const musicPlaylists = await Promise.all(
      userPlaylistIds.map(async (userPlaylistId) => {
        const musicPlaylist = await prisma.playlist_Song.findFirst({
          select: {
            playlist_id: true,
          },
          where: {
            api_song_id: bigMusicId,
            playlist_id: userPlaylistId.id,
          },
        });

        return musicPlaylist
          ? { playlistId: musicPlaylist.playlist_id, musicFlag: true }
          : { playlistId: userPlaylistId.id, musicFlag: false };
      }),
    );

    return NextResponse.json(musicPlaylists, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバエラーが発生しました" }, { status: 500 });
  }
};
