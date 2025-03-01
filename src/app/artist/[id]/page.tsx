import ArtistInfo from "@/components/music/ArtistInfo/ArtistInfo";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtist, getArtistAlbum, getArtistSongs } from "@/utils/apiFunc";
import styles from "./page.module.css";

type ArtistPageProps = {
  params: Promise<{ id: string }>;
};

const ArtistPage = async ({ params }: ArtistPageProps) => {
  // クエリパラメーターからアーティストid取得
  const { id } = await params;
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
            id={artistData.resArtistData.id}
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

        <div className={styles.historySongsContent}>
          <MusicContentTitle title="試聴履歴" />
          <PlayHistory />
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
