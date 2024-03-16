import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./ErrorModal.module.css";

const ErrorModal = forwardRef(function ErrorModal(props, ref) {
  const dialogRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      openErrorModal() {
        dialogRef.current.showModal();
      },
    };
  });

  const closeErrorHandler = () => {
    dialogRef.current.close();
  };

  return createPortal(
    <dialog className={style.dialogBox} ref={dialogRef}>
      <div className={style.errorContent}>
        <h2>Invalid input</h2>
        <p>Oops ... Looks like you forgot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
        <button onClick={closeErrorHandler}>Okay</button>
      </div>
    </dialog>,
    document.body
  );
});

export default ErrorModal;
