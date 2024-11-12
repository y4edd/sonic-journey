import { useRouter } from "next/navigation";
import Button from "../user/Button/Button";
import ButtonStyles from "../user/Button/Button.module.css";
import styles from "./invalid.module.css";

const UnAuthenticated = () => {
  const router = useRouter();

  const clickToLogin = () => {
    router.push("/user/login");
  };
  return (
    <>
      <div className={styles.invalidContainer}>
        <p className={styles.invalidMessage}>
          不正な画面遷移です
          <br />
          下記ボタンよりログインしてください
        </p>
        <Button
          type="button"
          className={ButtonStyles.register}
          text={"ログインページへ移動"}
          onClick={clickToLogin}
        />
      </div>
    </>
  );
};

export default UnAuthenticated;
