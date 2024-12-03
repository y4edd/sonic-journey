"use client";

import type { FormData } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type UserRegister = () => {
  RegisterUser: (data: FormData) => Promise<void>;
  serverError: string;
};

export const userRegister: UserRegister = () => {
  const [serverError, setServerError] = useState<string>("");

  const router = useRouter();

  const RegisterUser = async (data: FormData) => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        // 詳細なエラーメッセージ取得
        const error = await response.json();
        setServerError(error.message);
      } else {
        toast.success("アカウント登録が完了しました！", {
          position: "top-center",
          autoClose: 1000,
          closeButton: true,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/user/login");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      setServerError("予期せぬエラーが発生しました");
    }
  };
  return {
    RegisterUser,
    serverError,
  };
};
