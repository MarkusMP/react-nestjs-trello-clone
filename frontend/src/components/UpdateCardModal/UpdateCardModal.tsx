import React, { useEffect, useState } from "react";
import styles from "./UpdateCardModal.module.scss";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MdSubtitles, MdOutlineSubject } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { updateCard, deleteCard } from "../../features/list/listSlice";
import Comment from "../Comment/Comment";
import {
  createCardComment,
  getComments,
  reset,
} from "../../features/card/cardSlice";

interface IProps {
  open: boolean;
  closeModal: () => void;
  cardId: string;
  cardTitle: string;
  listId: string;
  cardDescription: string;
}

const UpdateCardModal = ({
  closeModal,
  open,
  cardId,
  cardTitle,
  listId,
  cardDescription,
}: IProps) => {
  const [title, setTitle] = useState("");
  const [titleChange, setTitleChange] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const { commments } = useAppSelector((state) => state.card);

  useEffect(() => {
    dispatch(getComments(cardId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, cardId]);

  const handleDelete = () => {
    dispatch(deleteCard({ cardId, listId }));
    closeModal();
  };

  const titleChangeSet = () => {
    setTitle(cardTitle);
    setTitleChange(true);
  };

  const handleCreateDescription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateCard({ cardId, description, listId }));
    setDescOpen(false);
  };

  const updateCardTitleHandler = () => {
    if (cardTitle === title) {
      setTitleChange(false);
    } else {
      dispatch(updateCard({ cardId, title, listId }));
      setTitleChange(false);
    }
  };

  const openDescriptionEdit = () => {
    setDescription(cardDescription);
    setDescOpen(true);
  };

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCardComment({ cardId, comment }));
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      className={styles.modal}
      ariaHideApp={false}
      style={{
        overlay: {
          overflowY: "auto",
        },
      }}
    >
      <div className={styles.container}>
        <section className={styles.header}>
          <MdSubtitles />

          {titleChange ? (
            <textarea
              placeholder="Enter a title for this card..."
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={50}
              autoFocus
              onBlur={updateCardTitleHandler}
              className={styles.titleChange}
            />
          ) : (
            <p onClick={titleChangeSet}>{cardTitle}</p>
          )}

          <button className={styles.errorBtn} onClick={closeModal}>
            X
          </button>
        </section>

        <section className={styles.header}>
          <div className={styles.description}>
            <MdOutlineSubject />
            <h4>Description</h4>
            {cardDescription && !descOpen && (
              <button className={styles.edit} onClick={openDescriptionEdit}>
                Edit
              </button>
            )}
          </div>

          {cardDescription && !descOpen && <p>{cardDescription}</p>}

          {descOpen ? (
            <form
              className={styles.addListForm}
              onSubmit={handleCreateDescription}
            >
              <textarea
                placeholder="Add a more detailed description..."
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
              <div className={styles.addListBtns}>
                <button type="submit" className={styles.btnAddList}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setDescOpen(false)}
                  className={styles.closeAddList}
                >
                  X
                </button>
              </div>
            </form>
          ) : (
            cardDescription === "" && (
              <div className={styles.descAdd} onClick={() => setDescOpen(true)}>
                <p>Add a more detailed description...</p>
              </div>
            )
          )}
        </section>

        <section className={styles.header}>
          <div className={styles.description}>
            <AiOutlineBars />
            <h4>Comments</h4>
          </div>
          <form onSubmit={handleCreateComment}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Write a comment..."
                name="comment"
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className={styles.btn} style={{ margin: "0" }}>
                Add
              </button>
            </div>
          </form>
          <div className={styles.comments}>
            {commments &&
              commments.map((comment) => (
                <Comment
                  title={comment.comment}
                  key={comment.id}
                  commentId={comment.id}
                />
              ))}
          </div>
        </section>

        <section className={styles.header}>
          <button
            type="button"
            onClick={handleDelete}
            className={`${styles.btn} ${styles.remove}`}
          >
            Delete Card
          </button>
        </section>
      </div>
    </Modal>
  );
};

export default UpdateCardModal;
