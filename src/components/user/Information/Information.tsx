import styles from "./Information.module.css";
import { InformationProps } from "@/types/user";

const Information:React.FC<InformationProps> = ({text}) => {
  return (
    <div className={styles.information}>{text}</div>
  )
}

export default Information;
