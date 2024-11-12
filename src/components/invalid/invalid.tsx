import Button from "../user/Button/Button";
import ButtonStyles from "../user/Button/Button.module.css";
import styles from "./invalid.module.css";

type UnAuthenticated = {
  clickToLogin: () => void;
};

const UnAuthenticated = ({ clickToLogin }: UnAuthenticated) => {
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
          text={"ログイン"}
          onClick={clickToLogin}
        />
      </div>
    </>
  );
};

export default UnAuthenticated;
