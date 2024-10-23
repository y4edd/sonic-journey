"use client";

import BreadList from "@/components/top/BreadList/BreadList";
import Button from "@/components/user/Button/Button";
import ButtonStyles from "@/components/user/Button/Button.module.css";
import FormInput from "@/components/user/Form/FormInput";
import Information from "@/components/user/Information/Information";
import { schema } from "@/lib/validation";
import type { FormData } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from "./page.module.css";

const Edit = () => {
  // useStateでサーバーエラー管理
  const [_serverError, _setServerError] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  // FIXME: dataを受け取りますが今は引数無し
  const onSubmit: SubmitHandler<FormData> = async () => {
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
    
    router.push("/mypage");
  };

  const handleClick = () => {
    console.log("クリックを認識");
    router.push("/user/information");
  };

  return (
    <>
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/user/info", title: "アカウント情報" },
          { link: "/user/edit", title: "アカウント編集" }
        ]}
      />
      <div>
        <Information text="アカウント編集" />
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
          <Button type="submit" className={ButtonStyles.register} text={"更新"} />
          <Button type="button" className={ButtonStyles.return} text={"戻る"} onClick={handleClick} />
        </form>
      </div>
    </>
  );
};

export default Edit;
