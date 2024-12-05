"use client";
import { deletePlayHistory } from "@/utils/history";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import styles from "./DeleteButton.module.css";

const DeleteButton = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePlayHistory(userId);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("再生履歴の削除に失敗しました");
    }
  };

  return (
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
