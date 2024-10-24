import BreadList from "@/components/top/BreadList/BreadList";
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
    <div>
      <BreadList bread={[{ link: "/", title: "TOP" }]} />
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
            <ContentTitle title="人気新着アルバム" />
            <LinkButton label="もっと見る >" url="newarrival" />
          </div>
          <SongsGroup songs={newSongs} url="album" />
        </div>

        <div className={styles.newSongsContent}>
          <div className={styles.contentTitleGroup}>
            <ContentTitle title="シングルランキング" />
            <LinkButton label="もっと見る >" url="/ranking" />
          </div>
          <SongsGroup songs={singleSongs} url="music" />
        </div>
        <div className={styles.genreContent}>
          <ContentTitle title="ジャンル一覧" />
          <GenreGroup />
        </div>
      </div>
    </div>
  );
};

export default TopPage;
