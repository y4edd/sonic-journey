import Slider from "@/components/top/Slider/Slider";
import ContentTitle from "@/components/top/ContentTitle/ContentTitle";
import styles from "./page.module.css";
import FreeSearch from "@/components/top/FreeSearch/FreeSearch";

const TopPage = () => {
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
      </div>
    </main>
  );
};

export default TopPage;
