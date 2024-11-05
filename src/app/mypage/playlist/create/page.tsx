"use client";

import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import BreadList from "@/components/top/BreadList/BreadList";
import { getUserInfo } from "@/utils/apiFunc";
import type { UserInfo } from "@/types/user";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// NOTE: ハードナビゲーションにより、`/mypage/playlist/create`に画面遷移したときに表示されるページです。
const CreatePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const gotUser: UserInfo = await getUserInfo();
      if (!gotUser) {
        alert("ログインをしてください");
        router.push("/user/login");
      } else {
        setUser(gotUser);
      }
    };
    getUser();
  }, [router]);

  if (!user) return <div>Loading...</div>;
  console.log(user);
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
        <PlaylistForm user_id={user.id} />
      </div>
    </>
  );
};

export default CreatePage;
