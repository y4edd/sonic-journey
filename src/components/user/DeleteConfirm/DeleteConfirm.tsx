import styles from "./DeleteConfirm.module.css";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const DeleteConfirm = () => {
  return (
    <div className={styles.modal}>
      <p className={styles.warning}>本当に退会しますか?</p>
      <p className={styles.message}>このアカウントのデータ及び、<br />プレイリストはすべて削除されます</p>
      <div className={styles.buttonContainer}>
        <button className={styles.deleteButton}//onClick={choiceDelete} disabled={deleteProcessing}// 
        >退会する</button>
        <button className={styles.cancelButton} //</div>onClick={() => {setIsModalOpen}}
        >キャンセル</button>
      </div>
    </div>
  )
}

export default DeleteConfirm
