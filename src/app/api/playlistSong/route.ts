import prisma from "@/lib/prisma";
import { getUserIdFromToken } from "@/utils/getUserIdFromToken";
import { NextResponse, type NextRequest } from "next/server";

type PlaylistSong = {
  id: number;
  api_song_id: number;
};

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "ログインが必要です" },
        { status: 401 }
      );
    }

    const userId = getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json(
        { message: "認証に失敗しました" },
        { status: 401 }
      );
    }

    const { searchParams } = req.nextUrl;
    const playlistId = searchParams.get("id");

    if (!playlistId || isNaN(Number(playlistId))) {
      return NextResponse.json(
        { message: "有効なプレイリストidを指定してください" },
        { status: 400 }
      );
    }

    const playlistInfo = await prisma.playlist.findUnique({
      where: {
        id: Number(playlistId),
      },
    });

    if (!playlistInfo) {
      throw new Error("プレイリスト情報の取得を失敗しました");
    }

    if (playlistInfo.user_id !== userId) {
      return NextResponse.json(
        { message: "不正なアクセスです" },
        { status: 401 }
      );
    }
    const playlistTitle = playlistInfo.name;
    const tenPlaylistSongs = await prisma.playlist_Song.findMany({
      where: {
        playlist_id: Number(playlistId),
      },
    });
    const playlistSongs: PlaylistSong[] = [];

    tenPlaylistSongs.map((tenPlaylistSong, index) => {
      playlistSongs[index] = {
        id: tenPlaylistSong.id,
        api_song_id: Number(tenPlaylistSong.api_song_id),
      };
    });

    return NextResponse.json({ playlistTitle, playlistSongs }, { status: 200 });
  } catch (error) {
    console.error("error");
    return NextResponse.json(
      { message: "サーバエラーが発生しました" },
      { status: 500 }
    );
  }
};
