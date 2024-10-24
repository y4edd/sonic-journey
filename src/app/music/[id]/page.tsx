import ImageTitleLink from "@/components/music/ImageTitleLink/ImageTitleLink";
import MusicContentTitle from "@/components/music/MusicContentTitle/MusicContentTitle";
import SongInfoContent from "@/components/music/SongInfoContent/SongInfoContent";
import SongList from "@/components/mypage/SongList/SongList";
import BreadList from "@/components/top/BreadList/BreadList";
import { getArtistSongs, getSong } from "@/utils/apiFunc";
import type { ReadonlyURLSearchParams } from "next/navigation";
import styles from "./page.module.css";

type SongPageProps = {
  params: { id: string };
  searchParams: ReadonlyURLSearchParams;
};

const SongPage = async ({ params }: SongPageProps) => {
  // クエリパラメーターから楽曲id取得
  const { id } = params;

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
            title={resSongData.title}
            artist={resSongData.artist.name}
            image={resSongData.cover_xl}
            preview={resSongData.preview}
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
          <SongList songs={songs.resultData} errorMessage="人気楽曲を取得できませんでした" />
        </div>
      </div>
    </>
  );
};

export default SongPage;
