import { Fragment } from "react";
import ReactDom from "react-dom";

import classes from "./Modal.module.css";

const modalElement = document.getElementById("overley");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <div className={classes.backdrop} onClick={props.onHide} />,
        modalElement
      )}
      {ReactDom.createPortal(
        <div className={classes.modal}>
          <div className={classes.content}>{props.children}</div>
        </div>,
        modalElement
      )}
    </Fragment>
  );
};

export default Modal;
