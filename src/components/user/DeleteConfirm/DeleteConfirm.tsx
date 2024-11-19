import styles from "./DeleteConfirm.module.css";

type choiceDeleteProps = (event:React.MouseEvent<HTMLButtonElement>) => Promise<void>;

type DeleteConfirm = {
  choiceDelete: choiceDeleteProps;
  deleteProcessing: boolean;
  isModalOpen: boolean;
}


const DeleteConfirm = ({ choiceDelete, deleteProcessing, isModalOpen }: DeleteConfirm) => {
  return (
    <div className={styles.modal}>
      <p className={styles.warning}>本当に退会しますか?</p>
      <p className={styles.message}>このアカウントのデータ及び、<br />プレイリストはすべて削除されます</p>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton} onClick={choiceDelete} disabled={deleteProcessing}
        >退会する</button>
        <button className={styles.cancelButton} onClick={() => {isModalOpen}}
        >キャンセル</button>
      </div>
    </div>
  )
}

export default DeleteConfirm
