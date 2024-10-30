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
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";
import { useState } from "react";

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
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
    try{
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email:data.mailAddress,
          password:data.password,
        })
      })

      if (!response.ok) {
        // 詳細なエラーメッセージ取得
        const error = await response.json();
        setServerError(error.message);
        throw new Error(error.message);
      }else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error){
        setServerError(err.message);
      } else {
        setServerError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/login", title: "ログイン" },
        ]}
      />
      <div>
        <Information text="ログイン" />
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            className={ButtonStyles.register}
            text={"ログイン"}
          />
          {serverError && <div role="alert" className="error-message">{serverError}</div>}
        </form>
      </div>
      <Guide href="/user/register" guideText="新規登録は" message="こちら" />
    </>
  );
};

export default Login;
