import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./EditButton.module.css";

const EditButton = () => {
  return (
    // FIXME: ボタンにリンクを付ける
    <div className={styles.editButtonWrapper}>
      <button type="button">編集</button>
      <ArrowForwardIosIcon fontSize="small" color="disabled" />
    </div>
  );
};

export default EditButton;
