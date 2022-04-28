import React from "react";
import styles from "./Modal.module.scss";
import Modal from "react-modal";

interface IProps {
  open: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  title: string;
  description: string;
}
const ModalComponent = ({
  closeModal,
  open,
  description,
  title,
  handleDelete,
}: IProps) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      className={styles.modal}
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <h1>{title}</h1>
        <hr />
        <p>{description}</p>
        <hr />
        <div className={styles.btns}>
          <button onClick={closeModal} className={styles.btn}>
            Close
          </button>
          <button onClick={handleDelete} className={styles.errorBtn}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
