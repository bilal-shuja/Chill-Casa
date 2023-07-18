import React from "react";
import { Modal } from "pretty-modal";
import colorScheme from "../Colors/Styles.js";

const ConfirmQueryModal = ({ isShow, body, action }) => {
  return (
    <Modal open={isShow}>
      <div
        className="card p-3"
        style={{ background: colorScheme.body_bg_color,
        margin:"0px"
        }}
      >
        <div className="card-body">
          <p style={{ fontSize: "1em", fontFamily: "monospace" }}>{body}</p>
        </div>
        <div className="col-lg-12">
          <button
            onClick={() => action("No")}
            className="btn btn-outline-info btn-md"
          >
            No
          </button>

          <button
            onClick={() => action("Yes")}
            className="btn btn-outline-danger float-right btn-md"
          >
            Agree?
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmQueryModal;
