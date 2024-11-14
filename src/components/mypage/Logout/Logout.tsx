"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import menuStyles from "../MenuBox/MenuBox.module.css";
import styles from "./Logout.module.css";

const Logout = () => {
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
  return (
    <>
      <button type="button" onClick={logoutUser} className={styles.menuBox}>
        <div className={menuStyles.menuIcon}>
          <LogoutIcon fontSize="large" />
        </div>
        <p>ログアウト</p>
      </button>
      <div className={styles.errorMessage}>{serverError}</div>
    </>
  );
};

export default Logout;
