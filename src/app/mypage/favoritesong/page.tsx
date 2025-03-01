export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import FavoriteSongsContainer from "@/components/mypage/FavoriteSongsContainer/FavoriteSongsContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerSong } from "@/types/deezer";
import { checkLoggedInServer, getSong } from "@/utils/apiFunc";
import { getFavoriteSongs } from "@/utils/favoriteSong";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

type favoriteSong = {
  songId: number;
  updatedAt: Date;
};

const FavoriteSongs = async () => {
  // NOTE: cookieからtokenを取得し、ログインしているか確認
  const token = await getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  // NOTE: DBからお気に入り楽曲を取得
  const favoriteSongs: { resultData: favoriteSong[] } = await getFavoriteSongs(token);

  // NOTE: お気に入り楽曲の楽曲idをもとに、楽曲情報を取得してデータに加える
  const favoriteSongsData = await Promise.all(
    favoriteSongs.resultData.map(async (song) => {
      const songData: { resSongData: DeezerSong } = await getSong(song.songId);
      return { ...song, songData: songData.resSongData };
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoritesong", title: "お気に入り楽曲" },
        ]}
      />
      <MenuHeader title="お気に入り楽曲" />
      <FavoriteSongsContainer songsInfo={favoriteSongsData} />
    </div>
  );
};

export default FavoriteSongs;
