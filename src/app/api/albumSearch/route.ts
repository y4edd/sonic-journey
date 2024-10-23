import type { AlbumSong } from "@/types/deezer";
import { duration } from "@mui/material";
import { type NextRequest, NextResponse } from "next/server";

// NOTE: 楽曲idからアルバム情報を取得して、DeezerAlbumの方に合わせたデータを返すAPI
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const album = searchParams.get("album");

    const getAlbum = await fetch(`https://api.deezer.com/album/${album}`);

    if (!getAlbum) {
      return NextResponse.json({ message: "アルバム情報が見つかりませんでした" }, { status: 404 });
    }

    const albumData = await getAlbum.json();
    const albumSongs = albumData.tracks.data.map((song: AlbumSong) => {
      return {
        id: song.id,
        title: song.title ?? "title",
        duration: song.duration ?? "不明",
        preview: song.preview,
        cover_xl: song.album.cover_xl ?? "/images/defaultsong.png",
      };
    });

    const resultData = {
      id: albumData.id,
      title: albumData.title ?? "title",
      cover_xl: albumData.cover_xl ?? "/images/defaultsong.png",
      nb_tracks: albumData.nb_tracks ?? "不明",
      artist: {
        id: albumData.artist.id,
        name: albumData.artist.name ?? "artist",
        picture_xl: albumData.artist.picture_xl ?? "/images/defaultsong.png",
      },
      albumSongs,
    };
    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
