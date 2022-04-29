import React, { useState, useEffect } from "react";
import styles from "./UpdateBoardModal.module.scss";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset,
  updateBoard,
  uploadBoardImage,
  deleteBoard,
} from "../../features/board/boardSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IProps {
  open: boolean;
  closeModal: () => void;
  boardId: string;
}

const UpdateBoardModal = ({ closeModal, open, boardId }: IProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File>();
  const [color, setColor] = useState("");
  const dispatch = useAppDispatch();
  const { message, errorMessage } = useAppSelector((state) => state.board);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate("/dashboard");
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [message, navigate, errorMessage]);

  const handleBackgroundImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateBoard({
        background: color,
        id: boardId,
      })
    );
    closeModal();
  };

  const uploadFileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      dispatch(reset());
      dispatch(uploadBoardImage({ id: boardId, image }));
      closeModal();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateBoard({
        title,
        background: link,
        id: boardId,
      })
    );
    closeModal();
  };

  const handleDelete = () => {
    dispatch(deleteBoard(boardId));
  };

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImage(e.target.files[0]);
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
          <h1>Board Settings</h1>
          <button className={styles.errorBtn} onClick={closeModal}>
            X
          </button>
        </section>

        <section className={styles.form}>
          <form onSubmit={onSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Update Board Title</label>

              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter updated board title..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="link">Enter background image url</label>

              <input
                type="url"
                id="link"
                name="link"
                value={link}
                placeholder="Enter board background image url..."
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Update Board
              </button>
            </div>
          </form>
        </section>
        <section className={styles.header}>
          <h1>Upload Board Background Image</h1>
          <button className={styles.errorBtn} onClick={closeModal}>
            X
          </button>
        </section>

        <section className={styles.form}>
          <form onSubmit={uploadFileHandler}>
            <div className={styles.formGroup}>
              <label htmlFor="image">Upload an image</label>

              <input
                type="file"
                name="image"
                id="image"
                onChange={handleSetImage}
                accept=".jpg, .jpeg, .png"
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Upload Board Image
              </button>
            </div>
          </form>
        </section>
        <section className={styles.header}>
          <h1>Set background color</h1>
          <button className={styles.errorBtn} onClick={closeModal}>
            X
          </button>
        </section>

        <section className={styles.form}>
          <form onSubmit={handleBackgroundImage}>
            <div className={styles.formGroups}>
              <label htmlFor="color">Set a background color</label>

              <input
                type="color"
                name="color"
                id="color"
                value={color}
                className={styles.color}
                style={{ backgroundColor: color }}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.btn}>
                Set Background Color
              </button>
            </div>
          </form>
        </section>
        <section className={styles.header}>
          <h1>Delete Board</h1>
        </section>
        <section className={styles.form}>
          <div className={styles.formGroup}>
            <button
              type="button"
              onClick={handleDelete}
              className={`${styles.btn} ${styles.remove}`}
            >
              Delete Board
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default UpdateBoardModal;
