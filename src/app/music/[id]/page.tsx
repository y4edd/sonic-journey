import ImageTitleLink from "@/components/music/ImageTitleLink/ImageTitleLink";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import SongInfoContent from "@/components/music/SongInfoContent/SongInfoContent";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtistSongs, getSong } from "@/utils/apiFunc";
import type { ReadonlyURLSearchParams } from "next/navigation";
import styles from "./page.module.css";

type SongPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const SongPage = async ({ params }: SongPageProps) => {
  // クエリパラメーターから楽曲id取得
  const { id } = await params;

  // 取得したidの楽曲情報を取得
  const { resSongData } = await getSong(Number(id));

  // 上記で取得したアーティストIDからアーティストの人気楽曲を最大4件取得
  const songs = await getArtistSongs(resSongData.artist.id, 4);

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/music/${resSongData.id}`, title: "楽曲詳細" },
        ]}
      />
      <div className={styles.songPageContent}>
        <div className={styles.songDetailContent}>
          <SongInfoContent
            id={resSongData.id}
            title={resSongData.title}
            artist={resSongData.artist.name}
            image={resSongData.cover_xl}
            preview={resSongData.preview}
            albumId={resSongData.album.id}
          />
        </div>
        <div className={styles.artistInfoLinkContent}>
          <MusicContentTitle title="アーティスト情報" />
          <ImageTitleLink
            url={`/artist/${resSongData.artist.id}`}
            name={resSongData.artist.name}
            image={resSongData.artist.picture_xl}
          />
        </div>

        <div className={styles.artistFavoriteSongsContent}>
          <MusicContentTitle title="人気楽曲" />
          <SongList
            songs={songs.resultData}
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

export default SongPage;
