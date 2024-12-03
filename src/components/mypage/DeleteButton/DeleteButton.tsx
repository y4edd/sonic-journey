"use client";
import { deletePlayHistory } from "@/utils/history";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import styles from "./DeleteButton.module.css";

const DeleteButton = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deletePlayHistory(userId);

    if (res) {
      router.refresh();
    } else {
      alert("再生履歴の削除に失敗しました");
    }
  };
  return (
    // FIXME: ボタン押下時に履歴の削除処理を呼び出す
    <div className={styles.container}>
      <div className={styles.deleteButtonWrapper}>
        <DeleteIcon />
        <button type="button" onClick={handleDelete}>
          履歴を削除
        </button>
      </div>
    </div>
  );
};

export default DeleteButton;
