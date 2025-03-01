import AlbumInfo from "@/components/music/AlbumInfo/AlbumInfo";
import AlbumSingles from "@/components/music/AlbumSingles/AlbumSingles";
import ImageTitleLink from "@/components/music/ImageTitleLink/ImageTitleLink";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getAlbum, getArtistSongs } from "@/utils/apiFunc";
import type { ReadonlyURLSearchParams } from "next/navigation";
import styles from "./page.module.css";

type AlbumPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const AlbumPage = async ({ params }: AlbumPageProps) => {
  // クエリパラメーターからアルバムidを取得
  const { id } = await params;

  // 取得したidのアルバム情報を取得
  const { resultData } = await getAlbum(Number(id));

  // 上記で取得したアーティストIDからアーティストの人気楽曲を最大4件取得
  const artistSongs = await getArtistSongs(resultData.artist.id, 4);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/album/${resultData.id}`, title: "アルバム詳細" },
        ]}
      />

      <div className={styles.albumPageContent}>
        <div className={styles.albumDetailContent}>
          <AlbumInfo
            image={resultData.cover_xl}
            title={resultData.title}
            artist={resultData.artist.name}
            nb_tracks={resultData.nb_tracks}
          />
        </div>
        <div className={styles.albumSongsContent}>
          <MusicContentTitle title="収録楽曲" />
          <AlbumSingles singles={resultData.albumSongs} />
        </div>
        <div className={styles.artistInfoLinkContent}>
          <MusicContentTitle title="アーティスト情報" />
          <ImageTitleLink
            url={`/artist/${resultData.artist.id}`}
            name={resultData.artist.name}
            image={resultData.artist.picture_xl}
          />
        </div>
        <div className={styles.artistFavoriteSongsContent}>
          <MusicContentTitle title="人気楽曲" />
          <SongList
            songs={artistSongs.resultData}
            url="music"
            errorMessage="人気楽曲を取得できませんでした"
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

export default AlbumPage;
