import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import FavoriteArtistsEditContainer from "@/components/mypage/FavoriteArtistsEditContainer/FavoriteArtistsEditContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerArtist } from "@/types/deezer";
import { checkLoggedInServer, getArtist } from "@/utils/apiFunc";
import { getFavoriteArtists } from "@/utils/favoriteArtist";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import styles from "./page.module.css";

type favoriteArtist = {
  artistId: number;
  updatedAt: Date;
};

const EditFavoriteArtists = async () => {
  // ログイン確認をする
  const token = getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  // DBからお気に入りアーティストを取得する
  const favoriteArtists: { resultData: favoriteArtist[] } = await getFavoriteArtists(token);

  // アーティストidをもとにアーティスト情報を取得してデータに追加する
  const favoriteArtistsData = await Promise.all(
    favoriteArtists.resultData.map(async (artist) => {
      const artistData: { resArtistData: DeezerArtist } = await getArtist(artist.artistId);
      return { ...artist, artistData: artistData.resArtistData };
    }),
  );

  return (
    <div>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/favoriteartist", title: "お気に入りアーティスト" },
          { link: "/mypage/favoriteartist/edit", title: "編集" },
        ]}
      />
      <MenuHeader title="お気に入りアーティスト" />
      <div className={styles.editMessage}>
        <p>解除するアイテムを選択してください</p>
      </div>
      <FavoriteArtistsEditContainer artistsInfo={favoriteArtistsData} />
    </div>
  );
};

export default EditFavoriteArtists;
