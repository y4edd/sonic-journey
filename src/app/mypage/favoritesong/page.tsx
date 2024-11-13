import FavoriteSongsContainer from "@/components/mypage/FavoriteSongsContainer/FavoriteSongsContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerSong } from "@/types/deezer";
import { getFavoriteSongs, getSong } from "@/utils/apiFunc";

type favoriteSong = {
  songId: number;
  updatedAt: Date;
};

const FavoriteSongs = async () => {
  // NOTE: DBからお気に入り楽曲を取得
  const favoriteSongs: { resultData: favoriteSong[] } = await getFavoriteSongs();

  // NOTE: お気に入り楽曲の楽曲idをもとに、楽曲情報を取得
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
