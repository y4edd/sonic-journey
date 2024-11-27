"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type UseLogout = () => {
  logoutUser: () => Promise<void>;
  serverError: string;
};

export const useLogout: UseLogout = () => {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const logoutUser = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("ログアウトが完了しました！", {
          position: "top-center",
          autoClose: 1000,
          closeButton: true,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        toast.error("ログアウトに失敗しました。もう一度お試しください。");
      }
    } catch (err) {
      console.log(err);
      setServerError("サーバーエラーが発生しました");
    }
  };

  return {
    logoutUser,
    serverError,
  };
};
