import styles from "./page.module.css";
import BreadList from "@/components/top/BreadList/BreadList";
const Page = () => {
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
          { link: "/mypage/playlist/edit", title: "編集" },
        ]}
      />
      <div className={styles.wrapper}>*ここに編集機能を</div>
    </>
  );
};

export default Page;
