import type { ArtistAlbum } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const artistName = searchParams.get("artistName");

    const artistAlbums = await fetch(`https://api.deezer.com/search/album?q=${artistName}&limit=4`);

    if (!artistAlbums) {
      return NextResponse.json(
        {
          message: "アーティストのアルバムが見つかりませんでした",
        },
        {
          status: 404,
        },
      );
    }

    const artistAlbumsData = await artistAlbums.json();
    const resultData = artistAlbumsData.data.map((data: ArtistAlbum) => {
      return {
        id: data.id,
        title: data.title,
        cover_xl: data.cover_xl,
        artist: {
          name: data.artist.name,
        },
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};