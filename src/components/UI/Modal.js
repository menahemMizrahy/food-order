import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const modalElement = document.getElementById("overley");

const Modal = (props) => {
  return (
    <>
      {createPortal(<div className={classes.backdrop} onClick={props.onHide} />, modalElement)}
      {createPortal(
        <div className={classes.modal}>
          <div className={classes.content}>{props.children}</div>
        </div>,
        modalElement
      )}
    </>
  );
};

export default Modal;
