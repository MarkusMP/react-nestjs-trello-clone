import React, { useState } from "react";
import styles from "./CreateBoardModal.module.scss";
import Modal from "react-modal";
import { useAppDispatch } from "../../app/hooks";
import { createBoard } from "../../features/board/boardSlice";

interface IProps {
  open: boolean;
  closeModal: () => void;
}

const CreateBoardModal = ({ closeModal, open }: IProps) => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createBoard({ title }));
    closeModal();
  };
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      className={styles.modal}
      ariaHideApp={false}
    >
      <div className={styles.container}>
        <section className={styles.header}>
          <h1>Create Board</h1>
          <button className={styles.errorBtn} onClick={closeModal}>
            X
          </button>
        </section>
        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>

              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter board title..."
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Create new Board
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
