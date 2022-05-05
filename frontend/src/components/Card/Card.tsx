import React, { useState } from "react";
import styles from "./Card.module.scss";
import { BsPen } from "react-icons/bs";
import UpdateCardModal from "../UpdateCardModal/UpdateCardModal";

interface IProps {
  title: string;
  id: string;
  listId: string;
  description: string;
}
const Card = ({ title, id, listId, description }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <p>{title}</p>
        <button className={styles.infoBtn} onClick={() => setIsOpen(true)}>
          <BsPen />
        </button>
      </div>
      {isOpen && (
        <UpdateCardModal
          cardId={id}
          closeModal={handleClose}
          open={isOpen}
          cardTitle={title}
          listId={listId}
          cardDescription={description}
        />
      )}
    </>
  );
};

export default Card;
