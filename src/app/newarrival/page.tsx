import styles from "./page.module.css";
import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { Song } from "@/components/newChart/Song/Song";
import { getNewSongs } from "@/utils/apiFunc";

const Page = async () => {
  const getSongs = await getNewSongs(20);
  return (
    <div className={styles.container}>
      <ChartTitle title="新着（アルバム）" />
      <div>
        <Song songs={getSongs} />
      </div>
    </div>
  );
};

export default Page;
