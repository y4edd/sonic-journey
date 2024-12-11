export const dynamic = "force-dynamic"; // 動的レンダリングを強制する

import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import FavoriteArtistsContainer from "@/components/mypage/FavoriteArtistsContainer/FavoriteArtistsContainer";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import BreadList from "@/components/top/BreadList/BreadList";
import type { DeezerArtist } from "@/types/deezer";
import { checkLoggedInServer, getArtist } from "@/utils/apiFunc";
import { getFavoriteArtists } from "@/utils/favoriteArtist";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";

type favoriteArtist = {
  artistId: number;
  updatedAt: Date;
};

const FavoriteArtist = async () => {
  // NOTE: cookieからtokenを取得し、ログインしているか確認
  const token = getTokenFromCookie();
  const isLoggedin = await checkLoggedInServer(token);

  if (!isLoggedin) {
    return <UnauthorizedAccess />;
  }

  // NOTE: DBからお気に入りアーティストを取得
  const favoriteArtists: { resultData: favoriteArtist[] } = await getFavoriteArtists(token);

  // NOTE: アーティストidをもとにアーティスト情報を取得してデータに追加
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
        ]}
      />
      <MenuHeader title="お気に入りアーティスト" />
      <FavoriteArtistsContainer artistsInfo={favoriteArtistsData} />
    </div>
  );
};

export default FavoriteArtist;
