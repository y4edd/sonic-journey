import ArtistInfo from "@/components/music/ArtistInfo/ArtistInfo";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtist, getArtistAlbum, getArtistSongs } from "@/utils/apiFunc";
import type { ReadonlyURLSearchParams } from "next/navigation";
import styles from "./page.module.css";

type ArtistPageProps = {
  params: { id: string };
  artistParams: ReadonlyURLSearchParams;
};

const ArtistPage = async ({ params }: ArtistPageProps) => {
  // クエリパラメーターからアーティストid取得
  const { id } = params;
  const artistData = await getArtist(Number(id));

  // 取得したアーティストidから楽曲情報を取得
  const artistSingleSongs = await getArtistSongs(Number(id), 4);

  // 取得したアーティスト名からアルバム情報を取得
  const artistAlbums = await getArtistAlbum(artistData.resArtistData.name, 4);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/artist/${id}`, title: "アーティスト詳細" },
        ]}
      />
      <div className={styles.artistDetailPage}>
        <div className={styles.artistInfoContent}>
          <ArtistInfo
            image={artistData.resArtistData.picture_xl}
            name={artistData.resArtistData.name}
          />
        </div>

        <div className={styles.singleContent}>
          <MusicContentTitle title="シングル" />
          <SongList
            songs={artistSingleSongs.resultData}
            url="music"
            errorMessage="シングル楽曲を取得できませんでした"
          />
        </div>

        <div className={styles.albumContent}>
          <MusicContentTitle title="アルバム" />
          <SongList
            songs={artistAlbums.resultData}
            url="album"
            errorMessage="アルバムを取得できませんでした"
          />
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
