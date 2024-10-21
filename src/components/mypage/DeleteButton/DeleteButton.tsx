import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./Deletebutton.module.css";

const DeleteButton = () => {
  return (
    // FIXME: ボタン押下時に履歴の削除処理を呼び出す
    <div className={styles.container}>
      <div className={styles.deleteButtonWrapper}>
        <DeleteIcon />
        <button type="button">履歴を削除</button>
      </div>
    </div>
  );
};

export default DeleteButton;
