import ContentTitle from "@/components/top/ContentTitle/ContentTitle";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";
import GenreGroup from "@/components/top/GenreGroup/GenreGroup";
import LinkButton from "@/components/top/LinkButton/LinkButton";
import Slider from "@/components/top/Slider/Slider";
import SongsGroup from "@/components/top/SongsGroup/SongsGroup";
import { getNewSongs, getRankSingleSongs } from "@/utils/apiFunc";
import styles from "./page.module.css";

const TopPage = async () => {
  // 新着人気楽曲を取得
  const newSongs = await getNewSongs(4);
  // シングルランキング楽曲を取得
  const singleSongs = await getRankSingleSongs(4);

  return (
    <main>
      <div>
        <div className={styles.specialContent}>
          <ContentTitle title="特集" />
          <Slider />
        </div>

        <div className={styles.freeSearchContent}>
          <FreeSearch />
        </div>

        <div className={styles.newSongsContent}>
          <div className={styles.contentTitleGroup}>
            <ContentTitle title="人気新着" />
            <LinkButton label="もっと見る >" />
          </div>
          <SongsGroup songs={newSongs} />
        </div>

        <div className={styles.newSongsContent}>
          <div className={styles.contentTitleGroup}>
            <ContentTitle title="シングルランキング" />
            <LinkButton label="もっと見る" />
          </div>
          <SongsGroup songs={singleSongs} />
        </div>
        <div className={styles.genreContent}>
          <ContentTitle title="ジャンル一覧" />
          <GenreGroup />
        </div>
      </div>
    </main>
  );
};

export default TopPage;
