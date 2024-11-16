"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import Information from "@/components/user/Information/Information";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "./page.module.css";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedAccess from "@/components/UnauthorizedAccess/UnauthorizedAccess";
import { fetchUser } from "@/utils/apiFunc";

const Info = () => {

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  // FIXME:ユーザ情報取得
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
    // 警告してから削除
    router.push("/");
  };

  const handleBack = () => {
    router.push("/mypage");
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/user/info", title: "アカウント情報" },
        ]}
      />
      <ToastContainer />
      <div>
        <Information text="アカウント情報" />
      </div>
      <div className={styles.container}>
        <UserDetail name={"ユーザー名"} data={data.name} />
        <UserDetail name={"メールアドレス"} data={data.email} />
        <UserDetail name={"パスワード"} data={data.password} />
        <Button type="button" className={ButtonStyles.register} text={"編集"} onClick={handleEdit} />
        <Button type="button" className={ButtonStyles.delete} text={"退会"} onClick={handleDelete} />
        <Button type="button" className={ButtonStyles.return} text={"戻る"} onClick={handleBack} />
        <div className={styles.errorMessage}>{serverError}</div>
      </div>
    </>
  );
};

export default Info;
