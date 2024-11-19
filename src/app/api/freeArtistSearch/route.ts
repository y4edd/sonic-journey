import type { DeezerArtist } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

// NOTE: 検索ワードから曲情報を取得して、DeezerArtistの型に合わせたデータを返すAPI
export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const artist = searchParams.get("artist");
    const getArtist = await fetch(
      `https://api.deezer.com/search/artist?q=${artist}`
    );

    if (!getArtist) {
      return NextResponse.json(
        { message: "アーティスト情報が見つかりませんでした" },
        { status: 404 }
      );
    }

    const artistData = await getArtist.json();
    const resultData = artistData.data.map((data: DeezerArtist) => {
      return {
        id: data.id,
        name: data.name ?? "artist",
        link: data.link ?? "link",
        picture_xl: data.picture_xl ?? "/images/defaultsong.png",
      };
    });

    return NextResponse.json({ resultData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
};
