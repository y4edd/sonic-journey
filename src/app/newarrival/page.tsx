import styles from "./page.module.css";
import { ChartTitle } from "@/components/newChart/ChartTitle/ChartTitle";
import { Song } from "@/components/newChart/Song/Song";

const Page = () => {
  return (
    <div className={styles.container}>
      <ChartTitle title="新着（アルバム）" />
      <div>
        <Song />
      </div>
    </div>
  );
};

export default Page;
