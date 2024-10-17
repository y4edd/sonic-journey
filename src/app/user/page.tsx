"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import "./page.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ContentTitle from "@/components/top/ContentTitle/ContentTitle";
import { error } from "console";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSharp } from "@mui/icons-material";
import { RequestCookiesAdapter } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import Link from "next/link";

// Zod のスキーマを定義
const schema = z.object({
  name: z.string().min(1, "ユーザー名は必須です").max(20,"20文字以内です"),
  mailAddress: z.string().email("正しいメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
  passwordConfirm: z.string().min(6, "パスワード確認は6文字以上で入力してください"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "パスワードが一致しません",
  path: ["passwordConfirm"],
});

// zodの型定義
type FormData = z.infer<typeof schema>;

const UserRegistration = () => {
  // useStateでサーバーエラー管理
  const [_serverError,_setServerError] = useState<string | null>(null);
  // Reacr hook formでフォーム管理
  const { register, handleSubmit,formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit:SubmitHandler<FormData> = async(data: FormData) => {
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
    console.log(data);
    router.push("/user/login");
  };

  return (
    <>
      <div>アカウント登録</div>
      <div className="main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-register">
              <label>ユーザー名</label>
              <input
                type="text"
                {...register("name", {
                  required: true,
                  minLength: 1,
                })}
                id="userName"
                placeholder="tanitune"
              />
              {errors.name && <span className="error-message">{String(errors.name.message)}</span>}
            </div>
            <div className="form-register">
              <label>メールアドレス</label>
              <input
                type="email"
                {...register("mailAddress", {
                  required: true,
                  minLength: 5,
                })}
                id="mailAddress"
                placeholder="tanisan@example.com"
              />
              {errors.mailAddress && <span className="error-message">{String(errors.mailAddress.message)}</span>}
            </div>
            <div className="form-register">
              <label>パスワード入力</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                id="password"
                placeholder="password"
              />
              {errors.password && <span className="error-message">{String(errors.password.message)}</span>}
            </div>
            <div className="form-register">
              <label>パスワード確認</label>
              <input
                type="password"
                {...register("passwordConfirm", {
                  required: true,
                  minLength: 6,
                })}
                id="passwordConfirm"
                placeholder="password"
              />
              {errors.passwordConfirm && <span className="error-message">{String(errors.passwordConfirm.message)}</span>}
            </div>
            <input type="submit" value="ユーザー登録" className="register" />
          </form>
      </div>
      <p>登録済みの方は<Link href="/login">ログイン</Link></p>
    </>
  )
};

export default UserRegistration;
