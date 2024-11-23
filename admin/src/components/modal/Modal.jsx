import React from "react";
import "./modal.scss";
import { RiCloseLine } from "@remixicon/react";

function Modal({ setVisible, action, prompt, canBeUndone }) {
  return (
    <div className="modal">
      <div className="modal-body">
        <p>
          <strong>{prompt}</strong>
        </p>
        {canBeUndone && (
          <p>
            <small>This cannot be undone</small>
          </p>
        )}
      </div>
      <div className="modal-actions">
        <button className="btn-primary btn-primary-red" onClick={action}>
          Confirm
        </button>
        <button className="btn-primary" onClick={() => setVisible(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Modal;
