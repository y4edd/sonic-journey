import type { DeezerNewRelease } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  try {
    const limit = searchParams.get("limit");

    const newSongs = await fetch(`https://api.deezer.com/editorial/16/releases?limit=${limit}`);

    if (!newSongs) {
      return NextResponse.json({ message: "新着楽曲情報が見つかりませんでした" }, { status: 404 });
    }

    const songsData = await newSongs.json();
    const resultData = songsData.data.map((data: DeezerNewRelease) => {
      return {
        id: data.id,
        title: data.title ?? "album",
        cover_xl: data.cover_xl ?? "/images/defaultsong.png",
        release_date: data.release_date ?? "release_date",
        artist: {
          id: data.artist.id,
          name: data.artist.name ?? "artist",
        },
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
