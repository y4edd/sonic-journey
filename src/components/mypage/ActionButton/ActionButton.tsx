import { Dispatch, SetStateAction } from "react";
import type { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  name: string;
  icon: ReactNode;
  setFunc: Dispatch<SetStateAction<boolean>>;
};

const ActionButton = ({ name, icon, setFunc }: ActionButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      {icon}
      <button type="button" onClick={() => setFunc(true)}>
        {name}
      </button>
    </div>
  );
};

export default ActionButton;
