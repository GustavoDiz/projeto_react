// CustomModal.js
import React from "react";
import { Button, Modal } from "react-bootstrap";
import '../styles/modal.css';
const CustomModal = ({
  showModal,
  handleClose,
  bodyContent,
  buttonContent,
}) => {
  const restart = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div>
      <Modal show={showModal} onHide={handleClose} >
        <Modal.Body className="modal">
          <h2>{bodyContent}</h2>
          <Button variant="secondary" onClick={restart}>
            {buttonContent}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomModal;
