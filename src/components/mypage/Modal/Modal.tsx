"use client";

import CloseIcon from "@mui/icons-material/Close";
import { type ElementRef, useEffect, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({
  setFunc,
  children,
}: {
  setFunc: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => {
    setFunc(false);
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
