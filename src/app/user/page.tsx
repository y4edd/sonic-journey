"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styles from './page.module.css';
import ButtonStyles from "@/components/user/Button/Button.module.css";
import { schema } from "@/lib/validation";
import { FormData } from "@/types/user";
import FormInput from "@/components/user/Form/FormInput";
import Button from "@/components/user/Button/Button";
import Guide from "@/components/user/Guide/Guide";
import Information from "@/components/user/Information/Information";

const UserRegistration = () => {
  // useStateでサーバーエラー管理
  const [_serverError, _setServerError] = useState<string | null>(null);
  // React hook formでフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // try {
    //   await registerUser(
    //     data.name,
    //     data.email,
    //     data.password,
    //     data.confirmPassword
    //   );
    //   alert("ユーザー登録完了");
    //   router.push("/user/login");
    // } catch (err:any){
    //   setServerError(err.message || "サーバーエラーです");
    // }
    router.push("/user/login");
  };

  return (
    <>
      <Information text="アカウント登録" />
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <FormInput
            label="ユーザー名"
            id="username"
            type="text"
            placeholder="tanitune"
            register={register("name", { required: true, minLength: 1})}
            error={errors.name}
          />
          <FormInput
            label="メールアドレス"
            id="mailAddress"
            type="email"
            placeholder="tani@example.com"
            register={register("mailAddress", {required: true, minLength: 5})}
            error={errors.mailAddress}
          />
          <FormInput
            label="パスワード"
            id="password"
            type="password"
            placeholder="password"
            register={register("password", { required: true, minLength: 6})}
            error={errors.password}
          />
          <FormInput
            label="パスワード確認"
            id="passwordConfirm"
            type="password"
            placeholder="password"
            register={register("passwordConfirm", {required: true, minLength: 6})}
            error={errors.passwordConfirm}
          />
          <Button type="submit" value="ユーザー登録" className={ButtonStyles.register}/>
        </form>
      </div>
      <Guide href="/login"  message="登録済みの方" />
    </>
  );
};

export default UserRegistration;
