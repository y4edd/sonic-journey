import type { ContributorsInfo, FavoriteArtistSong } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const artistId = searchParams.get("artistId");
    const limit = searchParams.get("limit");

    const artistFavoriteSongs = await fetch(
      `https://api.deezer.com/artist/${artistId}/top?limit=${limit}`,
    );

    if (!artistFavoriteSongs) {
      return NextResponse.json(
        {
          message: "アーティストの人気楽曲は見つかりませんでした",
        },
        { status: 404 },
      );
    }

    const artistFavoriteSongsData = await artistFavoriteSongs.json();
    const resultData = await artistFavoriteSongsData.data.map((data: FavoriteArtistSong) => {
      const artistImage = data.contributors.find(
        (contributor: ContributorsInfo) => contributor.name === data.artist.name,
      );
      return {
        id: data.id,
        title: data.title ?? "title",
        preview: data.preview,
        duration: data.duration ?? "duration",
        artist: {
          id: data.artist.id,
          name: data.artist.name ?? "artist",
          image: artistImage?.picture_big ?? "/images/defaultsong.png",
        },
        album: {
          id: data.album.id,
          title: data.album.title ?? "album",
          cover_xl: data.album.cover_big ?? "/images/defaultsong.png",
        },
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
