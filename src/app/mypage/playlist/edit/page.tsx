import styles from "./page.module.css";
import BreadList from "@/components/top/BreadList/BreadList";
import { PlaylistEdit } from "@/components/mypage/PlaylistsEdit/PlaylistEdit";

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
      <PlaylistEdit />
    </>
  );
};

export default Page;
