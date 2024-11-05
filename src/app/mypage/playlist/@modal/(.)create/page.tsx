"use client";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";
import { getUserInfo } from "@/utils/apiFunc";
import type { UserInfo } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/mypage/Modal/Modal";

// NOTE: @modalスロットの中で、/createルートをインターセプトしています。
// NOTE: ソフトナビゲーションにより、`/mypage/playlist/create`に画面遷移したときに表示されるページです。
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
  }, []);

  if (!user) return <div>Loading...</div>;
  return (
    <>
      <Modal>
        <PlaylistForm user_id={user.id} />
      </Modal>
    </>
  );
};

export default CreatePage;
