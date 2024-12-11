import type { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";
import styles from "./PlaylistButton.module.css";

type PlaylistButtonProps = {
  name: string;
  icon: ReactNode;
  setFunc: Dispatch<SetStateAction<boolean>>;
};

const PlaylistButton = ({ name, icon, setFunc }: PlaylistButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      {icon}
      <button type="button" onClick={() => setFunc(true)}>
        {name}
      </button>
    </div>
  );
};

export default PlaylistButton;
