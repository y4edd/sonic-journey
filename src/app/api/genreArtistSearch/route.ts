import type { GenreApiArtist } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

// ジャンルごとのアーティスト情報を取得するAPI
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const genre = searchParams.get("genre");

    const genreArtists = await fetch(`https://api.deezer.com/genre/${genre}/artists`);

    if (!genreArtists) {
      return NextResponse.json({
        message: "アーティスト情報が見つかりませんでした",
      });
    }

    const artistsData = await genreArtists.json();
    const resultData = await artistsData.data.map((data: GenreApiArtist) => {
      return {
        id: data.id,
        name: data.name ?? "artist",
        picture: data.picture_xl ?? "/images/defaultsong.png",
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
