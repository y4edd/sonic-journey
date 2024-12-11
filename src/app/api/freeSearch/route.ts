import type { DeezerSongs } from "@/types/deezer";
import { type NextRequest, NextResponse } from "next/server";

// Requestに含まれる検索ワードを元に楽曲情報を取得し、Responseとして返すAPI
export const POST = async (request: NextRequest) => {
  try {
    // requestのbody内にある検索ワードを取得
    const body = await request.json();
    // bodyからfreeWordの値を取得
    const freeWord = body.freeWord;

    // サーバーサイドで検索ワードのバリデーション
    if (!freeWord.trim()) {
      return NextResponse.json({ message: "検索ワードが正しくありません" }, { status: 400 });
    }

    // 検索ワードを元にdeezerから音楽情報を取得
    const songsResponse = await fetch(`https://api.deezer.com/search?q=${freeWord}`);

    // deezerにて音楽情報が見つからなかった場合
    if (!songsResponse) {
      return NextResponse.json({ message: "楽曲情報が見つかりませんでした。" }, { status: 404 });
    }
    // FIXME: 楽曲情報のみ取得（検索結果ページができたら取得する情報を再考する必要があります。）
    const songsData = await songsResponse.json();
    const resultData = songsData.data.map((data: DeezerSongs) => {
      return {
        id: data.id,
        title: data.title ?? "title",
        duration: data.duration ?? "duration",
        preview: data.preview,
        artist: {
          id: data.artist.id,
          name: data.artist.name ?? "artist",
          picture_big: data.artist.picture_big ?? "/images/defaultsong.png",
        },
        cover: data.album.cover_big ?? "/images/defaultsong.png",
      };
    });

    // 楽曲の件数を追加
    const totalResults = resultData.length;

    return NextResponse.json({ resultData, totalResults }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
