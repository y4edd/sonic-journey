import { type NextRequest, NextResponse } from "next/server";

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

export const GET = async (request: NextRequest) => {
  try {
    // const {searchParams} = request.nextUrl;
    // const genreName = searchParams.get("genre");
    // if(!genreName) {
    //   throw new Error("クエリの受け渡しに失敗しました");
    // }

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
    const filterData = await genreData.data.filter((data: GenreData) => {
      return (
        data.name === "すべて" ||
        data.name === "ポップス" ||
        data.name === "ロック" ||
        data.name === "R&B" ||
        data.name === "ダンス" ||
        data.name === "メタル" ||
        data.name === "アジア音楽" ||
        data.name === "キッズ" ||
        data.name === "映画/ゲーム"
      );
    });
    const resultData = await filterData.map((data: GenreData) => {
      return {
        id: data.id,
        name: data.name,
        picture: data.picture_xl,
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
