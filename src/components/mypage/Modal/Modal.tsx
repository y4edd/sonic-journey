"use client";

import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => {
    router.back();
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    return null; // NOTE: modal-rootが見つからない場合にレンダリングされないようにしています。
  }

  return createPortal(
    <div className={styles.modalBackdrop}>
      <dialog ref={dialogRef} className={styles.modal} onClose={onDismiss}>
        {children}
        <button type="button" onClick={onDismiss} className={styles.closeButton}>
          <CloseIcon />
        </button>
      </dialog>
    </div>,
    modalRoot,
  );
};

export default Modal;
