import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { type NextRequest, NextResponse } from "next/server";

export const POST = (req:NextRequest) => {
  try{
    // NOTE: ログインユーザーのidを取得する
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "ログインが必要です" }, { status: 401 });
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
    }

    // // NOTE: DBにお気に入り楽曲を追加する
    // const favoriteSong =await prisma.favorite_Song.create({
    //   data: {
    //     user_id:userId,
    //     // FIXME:ここがわかっていない。reqで何が渡ってくるようにすればいい？
    //     api_song_id:,
    //   },
    // });

  }catch(error){
    console.error(error);
    return NextResponse.json({ message: "サーバーエラーが発生しました" }, { status: 500 });
  }
};
