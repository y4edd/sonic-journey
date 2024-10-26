"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Guide from "@/components/user/Guide/Guide";
import Information from "@/components/user/Information/Information";
import { schema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";

const UserRegistration = () => {
  // useStateでサーバーエラー管理
  const [error, setError] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {

    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:data.userName,
        email:data.mailAddress,
        password:data.password,
      })
    })

    if (!response.ok) {
      // 詳細なエラーメッセージ取得
      const error = await response.text();
      setError(error);
      return;
    }

    // 登録成功後、signInを呼び出してログインセッションを開始
    const result = await signIn("credentials", {
      redirect: false,
      email: data.mailAddress,
      password: data.password,
    });

    if (!result?.error) {
      router.push("/user/login");
    } else {
      setError("ログインに失敗しました。");
    }
};

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
            name="userName"
            placeholder="tanitune"
            register={register}
            error={errors.userName}
          />
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            name="mailAddress"
            placeholder="tani@example.com"
            register={register}
            error={errors.mailAddress}
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
        </form>
      </div>
      <Guide href="/user/login" guideText="登録済みの方は" message="ログイン" />
    </>
  );
};

export default UserRegistration;
