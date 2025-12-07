// frontend/src/components/ConfirmModal.jsx
import React from "react";
import "../styles/confirmModal.css";


function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
  <div className="modal-box">
    <h3 className="modal-title">{title}</h3>

    <p className="modal-message">{message}</p>

    <div className="modal-actions">
      <button className="modal-btn secondary" onClick={onCancel}>
        Cancel
      </button>

      <button className="modal-btn danger" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  </div>
</div>

  );
}

export default ConfirmModal;
