import ActionButton from "@/components/mypage/ActionButton/ActionButton";
import ArtistList from "@/components/mypage/ArtistList/ArtistList";
import MenuHeader from "@/components/mypage/MenuHeader/MenuHeader";
import SortButtons from "@/components/mypage/SortButtons/SortButtons";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtist } from "@/utils/apiFunc";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./page.module.css";

const FavoriteArtist = async () => {
  // FIXME: ログインユーザーidを取得する
  // FIXME: ログインユーザーのお気に入りアーティストをDBから取得する

  // MEMO: 表示確認のため、仮でアーティストidの配列を定義する
  const favoriteArtistsId = [109785742, 4726033, 5482289, 1460437, 4993784];

  const favoriteArtistsInfo = await Promise.all(
    favoriteArtistsId.map(async (artistId) => {
      const artistData = await getArtist(artistId);

      return artistData.resArtistData;
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
      <SortButtons label="登録日" />
      <div className={styles.actionButtonContainer}>
        <ActionButton name="編集" icon={<EditIcon />} url="/mypage/favoriteartist/edit" />
      </div>
      <ArtistList
        artists={favoriteArtistsInfo}
        errorMessage="お気に入りアーティストは登録されていません"
      />
    </div>
  );
};

export default FavoriteArtist;
