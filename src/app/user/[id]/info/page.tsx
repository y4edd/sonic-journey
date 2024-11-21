"use client";

import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import Modal from "@/components/mypage/Modal/Modal";
import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import DeleteConfirm from "@/components/user/DeleteConfirm/DeleteConfirm";
import Information from "@/components/user/Information/Information";
import UserDetail from "@/components/user/UserDetail/UserDetail";
import type { UserData } from "@/types/user";
import { fetchUser, fetchUserInfo } from "@/utils/apiFunc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./page.module.css";

const Info = () => {
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | "">("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

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
      const data = await fetchUserInfo();
      if (data) {
        setUserData(data);
      } else {
        setUserData(undefined);
      }
    } catch (error) {
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
    router.push(`/user/${userId}/edit`);
  };

  // モーダル展開
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  // 退会
  const choiceDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });
      console.log(await response.text());
      if (!response.ok) {
        const error = await response.json();
        setServerError(error.message);
      }

      toast.success("編集が完了しました！", {
        position: "top-center",
        autoClose: 1000,
        closeButton: true,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);

      router.push("/");
    } catch (error) {
      console.log(error);
      setServerError("アカウントの削除に失敗しました");
    }
  };

  // 戻る
  const handleBack = () => {
    router.push("/mypage");
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: `/user/${userId}/info`, title: "アカウント情報" },
        ]}
      />
      <Information text="アカウント情報" />
      <div className={styles.container}>
        <ToastContainer />
        {isModalOpen && (
          <Modal setFunc={setIsModalOpen}>
            <DeleteConfirm
              choiceDelete={choiceDelete}
              isButtonDisabled={isButtonDisabled}
              cancelDelete={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
        {userData ? (
          <>
            <UserDetail label={"ユーザー名"} userData={userData.name} />
            <UserDetail label={"メールアドレス"} userData={userData.email} />
            <UserDetail label={"パスワード"} userData="*****" />
          </>
        ) : (
          <div>Loading...</div>
        )}
        <Button
          type="button"
          className={ButtonStyles.register}
          text={"編集"}
          onClick={handleEdit}
        />
        <Button
          type="button"
          className={ButtonStyles.delete}
          text={"退会"}
          onClick={handleDelete}
        />
        <Button type="button" className={ButtonStyles.return} text={"戻る"} onClick={handleBack} />
        <div className={styles.errorMessage}>{serverError}</div>
      </div>
    </>
  );
};

export default Info;
