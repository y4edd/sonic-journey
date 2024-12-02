import type { DeezerArtist } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

// NOTE: アーティストidからアーティスト情報を取得して、DeezerArtistの型に合わせたデータを返すAPI
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  try {
    const artist = searchParams.get("artist");

    const getArtist = await fetch(`https://api.deezer.com/artist/${artist}`);

    if (!getArtist) {
      return NextResponse.json(
        { message: "アーティスト情報が見つかりませんでした" },
        { status: 404 },
      );
    }

    const artistData = await getArtist.json();

    const resArtistData: DeezerArtist = {
      id: artistData.id,
      name: artistData.name ?? "artist",
      link: artistData.link ?? "link",
      picture_xl: artistData.picture_xl ?? "/images/defaultsong.png",
    };

    return NextResponse.json({ resArtistData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
