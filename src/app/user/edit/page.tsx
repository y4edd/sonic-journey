"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Information from "@/components/user/Information/Information";
import { registerSchema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import styles from "./page.module.css";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import UnauthorizedAccess from "@/components/invalid/UnauthorizedAccess";

const Edit = () => {
  // useStateでサーバーエラーの管理
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/checkLogin");
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
      } else {
        const error = await response.json();
        setServerError(error.message);
      }
    } catch (err) {
      console.log(err);
      setServerError("サーバーエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint: 依存配列を空にし、初回レンダリングのみ実行
  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  if (userId === null) {
    return <UnauthorizedAccess />;
  }

  // FIXME: dataを受け取り、データベースの内容を更新する処理実装
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // try {
    //   await registerUser(
    //     data.name,
    //     data.email,
    //     data.password,
    //     data.confirmPassword
    //   );
    //   alert("アカウント情報変更完了");
    //   router.push("/user/login");
    // } catch (err:any){
    //   setServerError(err.message || "サーバーエラーです");
    // }
    console.log(data);

    toast.success("編集が完了しました！", {
      position: "top-center",
      autoClose: 1000,
      closeButton: true,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
    });
    setTimeout(() => {
      router.push("/mypage");
    }, 1500);
  };

  const handleClick = () => {
    router.push("/user/information");
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/user/info", title: "アカウント情報" },
          { link: "/user/edit", title: "アカウント編集" },
        ]}
      />
      <ToastContainer />
      <div>
        <Information text="アカウント編集" />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="ユーザー名"
            id="userName"
            type="text"
            name="name"
            placeholder="tanitune"
            register={register}
            error={errors.name}
          />
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            name="email"
            placeholder="tani@example.com"
            register={register}
            error={errors.email}
          />
          <FormInput
            label="パスワード"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            register={register}
            error={errors.password}
          />
          <FormInput
            label="パスワード確認"
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="password"
            register={register}
            error={errors.passwordConfirm}
          />
          <Button type="submit" className={ButtonStyles.register} text={"更新"} />
          <Button
            type="button"
            className={ButtonStyles.return}
            text={"戻る"}
            onClick={handleClick}
          />
          <div className={styles.errorMessage}>{serverError}</div>
        </form>
      </div>
    </>
  );
};

export default Edit;
