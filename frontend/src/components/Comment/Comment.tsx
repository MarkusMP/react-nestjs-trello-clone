import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeComment, updateComment } from "../../features/card/cardSlice";
import styles from "./Comment.module.scss";

interface IProps {
  title: string;
  commentId: string;
}

const Comment = ({ title, commentId }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(removeComment(commentId));
  };

  const handleOpen = () => {
    setComment(title);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateComment({ comment: comment, id: commentId }));
    setIsOpen(false);
  };

  return (
    <div className={styles.comment}>
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Edit comment..."
              className={styles.formGroup}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autoFocus
            />
          </div>
          <div className={styles.btns}>
            <button type="submit" className={styles.btn}>
              Save
            </button>
            <button
              className={styles.errorBtn}
              type="button"
              onClick={handleDelete}
            >
              X
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.flex}>
          <p>{title}</p>

          <div className={styles.btns}>
            <button className={styles.btn} type="button" onClick={handleOpen}>
              Edit
            </button>

            <button
              className={styles.errorBtn}
              type="button"
              onClick={handleDelete}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
