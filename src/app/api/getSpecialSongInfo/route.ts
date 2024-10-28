import type { SpecialSongs } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const songs: SpecialSongs[] = body.songs;

    if (!songs || songs.length === 0) {
      return NextResponse.json({ message: "曲情報が見つかりませんでした" }, { status: 404 });
    }

    const songInfoPromises = songs.map((song) =>
      fetch(`https://api.deezer.com/track/${song.api_song_id}`)
        .then((res) => res.json())
        .then((songInfo) => {
          if (!songInfo || !songInfo.id || !songInfo.title) {
            throw new Error("取得した曲情報が無効です");
          }
          return {
            id: songInfo.id,
            title: songInfo.title_short,
            preview: songInfo.preview,
            cover_xl: songInfo.album.cover_xl,
            duration: songInfo.duration,
            artist: {
              id: songInfo.artist.id,
              name: songInfo.artist.name,
            },
            album: {
              id: songInfo.album.id,
              title: songInfo.album.title,
            },
          };
        }),
    );

    const songInfos = await Promise.all(songInfoPromises);

    return NextResponse.json(songInfos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
