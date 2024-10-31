"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Guide from "@/components/user/Guide/Guide";
import Information from "@/components/user/Information/Information";
import { registerSchema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";

const UserRegistration = () => {
  // useStateでサーバーエラー管理
  const [serverError, setServerError] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try{
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:data.name,
          email:data.email,
          password:data.password,
        })
      })

      if (!response.ok) {
        // 詳細なエラーメッセージ取得
        const error = await response.json();
        setServerError(error.message);
        throw new Error(error.message);
      }else {
        router.push("/user/login");
      }
    } catch (err) {
      if (err instanceof Error){
        setServerError(err.message);
      } else {
        setServerError("予期しないエラーが発生しました");
      }
    }
  }

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/user", title: "アカウント登録" },
        ]}
      />
      <div>
        <Information text="アカウント登録" />
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
          <Button type="submit" className={ButtonStyles.register} text={"ユーザー登録"} />
          {serverError && <div role="alert" className="error-message">{serverError}</div>}
        </form>
      </div>
      <Guide href="/user/login" guideText="登録済みの方は" message="ログイン" />
    </>
  );
};

export default UserRegistration;
