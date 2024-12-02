import type { DeezerSong } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

// NOTE: 楽曲idから曲情報を取得して、DeezerSongの型に合わせたデータを返すAPI
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  try {
    const song = searchParams.get("song");

    const getSong = await fetch(`https://api.deezer.com/track/${song}`);

    if (!getSong) {
      return NextResponse.json({ message: "楽曲情報が見つかりませんでした" }, { status: 404 });
    }
    const songData = await getSong.json();

    const resSongData: DeezerSong = {
      id: songData.id,
      title: songData.title ?? "title",
      cover_xl: songData.album.cover_xl ?? "/images/defaultsong.png",
      release_date: songData.album.release_date ?? "release_date",
      preview: songData.preview,
      artist: {
        id: songData.artist.id,
        name: songData.artist.name ?? "artist",
        picture_xl: songData.artist.picture_xl ?? "/images/defaultsong.png",
      },
      album: {
        id: songData.album.id,
        title: songData.album.title ?? "album",
        cover_xl: songData.album.cover_xl ?? "/images/defaultsong.png",
      },
    };

    return NextResponse.json({ resSongData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
