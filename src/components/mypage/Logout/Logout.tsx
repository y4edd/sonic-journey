"use client";
import { useLogout } from "@/hooks/useLogout";
import LogoutIcon from "@mui/icons-material/Logout";
import menuStyles from "../MenuBox/MenuBox.module.css";
import styles from "./Logout.module.css";

const Logout = () => {
  const { logoutUser } = useLogout();
  return (
    <>
      <button type="button" onClick={logoutUser} className={styles.menuBox}>
        <div className={menuStyles.menuIcon}>
          <LogoutIcon fontSize="large" />
        </div>
        <p>ログアウト</p>
      </button>
    </>
  );
};

export default Logout;
