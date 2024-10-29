import { GENRE_ARTISTS } from "@/constants/constant";
import { NextResponse } from "next/server";

interface GenreData {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: "genre";
}

export const GET = async () => {
  try {
    const genreInfos = await fetch("https://api.deezer.com/genre");
    if (!genreInfos) {
      return NextResponse.json(
        {
          message: "ジャンル情報が取得できませんでした",
        },
        {
          status: 500,
        }
      );
    }

    const genreData = await genreInfos.json();

    const filterData = genreData.data.filter((data: GenreData) => {
      return GENRE_ARTISTS.some(
        (GENRE_ARTIST) => data.name === GENRE_ARTIST.name
      );
    });
    const resultData = await filterData.map((data: GenreData) => {
      return {
        id: data.id,
        name: data.name,
        picture: data.picture_medium,
      };
    });
    return NextResponse.json(resultData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "サーバーエラーが発生しました",
      },
      {
        status: 500,
      }
    );
  }
};
