import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ open, onClose, onConfirm, message, title }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-title">{title}</div>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
         
          <button
            className="modal-button confirm-button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
          <button className="modal-button empcancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
