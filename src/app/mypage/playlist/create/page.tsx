import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import BreadList from "@/components/top/BreadList/BreadList";
import styles from "./page.module.css";

// NOTE: ハードナビゲーションにより、`/mypage/playlist/create`に画面遷移したときに表示されるページです。
const CreatePage = () => {
  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/mypage", title: "マイページ" },
          { link: "/mypage/playlist", title: "プレイリスト" },
          { link: "/mypage/playlist/create", title: "新規作成" },
        ]}
      />
      <div className={styles.formContainer}>
        <PlaylistForm />
      </div>
    </>
  );
};

export default CreatePage;
