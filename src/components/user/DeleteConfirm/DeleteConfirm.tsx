import styles from "./DeleteConfirm.module.css";

type choiceDeleteProps = (event:React.MouseEvent<HTMLButtonElement>) => Promise<void>;

type cancelDeleteProps = (event:React.MouseEvent<HTMLButtonElement>) => void;

type DeleteConfirm = {
  choiceDelete: choiceDeleteProps;
  deleteProcessing: boolean;
  cancelDelete: cancelDeleteProps;
}


const DeleteConfirm = ({ choiceDelete, deleteProcessing, cancelDelete }: DeleteConfirm) => {
  return (
    <div className={styles.modal}>
      <p className={styles.warning}>本当に退会しますか?</p>
      <p className={styles.message}>このアカウントのデータ及び、<br />プレイリストはすべて削除されます</p>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton} onClick={choiceDelete} disabled={deleteProcessing}
        >退会する</button>
        <button className={styles.cancelButton} onClick={cancelDelete}
        >キャンセル</button>
      </div>
    </div>
  )
}

export default DeleteConfirm
