import type { DeezerSong } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const limit = searchParams.get("limit");

    const singleSongs = await fetch(
      `https://api.deezer.com/chart/0/tracks?limit=${limit}`
    );

    if (!singleSongs) {
      return NextResponse.json({ message: "楽曲情報が見つかりませんでした" });
    }

    const songsData = await singleSongs.json();
    const resultData = songsData.data.map((data: DeezerSong) => {
      return {
        id: data.id,
        title: data.title ?? "title",
        artist: {
          id: data.artist.id,
          name: data.artist.name ?? "artist",
        },
        album: {
          id: data.album.id,
          title: data.album.title ?? "album",
          cover_xl: data.album.cover_xl ?? "/images/defaultsong.png",
        },
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" });
  }
};
