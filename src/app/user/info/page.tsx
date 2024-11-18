"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import Information from "@/components/user/Information/Information";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { fetchUser } from "@/utils/apiFunc";
import UserDetail from "@/components/user/UserDetail/UserDetail";
import { UserData } from "@/types/user";
import Modal from "@/components/mypage/Modal/Modal";

const Info = () => {

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userData,setUserData] = useState<UserData | undefined>(undefined); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 

  const router = useRouter();

  const loadUser = async () => {
    try {
      const data = await fetchUser();
      if (data?.id) {
        setUserId(data.id);
      } else {
        setUserId(null);
      }
    } catch {
      setServerError("サーバーエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    loadUser();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetch("/api/user/getUserInfo");
      const data = await response.json();

      if (!response.ok) {
        // 詳細なエラーメッセージ取得
        setServerError(data.message);
        return;
      }

      setUserData(data);
    } catch(error) {
      console.log(error);
      setServerError("ユーザー情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: マウント時のみ実行
  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (userId === null) {
    return <UnauthorizedAccess />;
  }

  const handleEdit = () => {
    router.push("/user/edit");
  };

  const handleDelete = () => {
    // モーダルを開く
    setIsModalOpen(true);
  };

  const choiceDelete = async () => {
    const response = await fetch("api/user/delete");
    
    router.push("/");
  };

  const handleBack = () => {
    router.push("/mypage");
  };

  return (
    <>
    {isModalOpen && (
      <Modal setFunc={setIsModalOpen}>
        <p>本当に退会しますか?</p>
        <p>※このアカウントのデータ、作成したプレイリストはすべて削除されます</p>
        <button onClick={choiceDelete}>退会する</button>
        <button onClick={() => setIsModalOpen(false)}>キャンセル</button>
      </Modal>
    )}
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/user/info", title: "アカウント情報" },
        ]}
      />
      <div>
        <Information text="アカウント情報" />
      </div>
      <div className={styles.container}>
        {userData ? (
          <>
            <UserDetail label={"ユーザー名"} userData={userData.name} />
            <UserDetail label={"メールアドレス"} userData={userData.email} />
            <UserDetail label={"パスワード"} userData="*****" />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <Button type="button" className={ButtonStyles.register} text={"編集"} onClick={handleEdit} />
        <Button type="button" className={ButtonStyles.delete} text={"退会"} onClick={handleDelete} />
        <Button type="button" className={ButtonStyles.return} text={"戻る"} onClick={handleBack} />
        <div className={styles.errorMessage}>{serverError}</div>
      </div>
    </>
  );
};

export default Info;
