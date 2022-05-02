import React, { useState, createRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import { removeList, updateList } from "../../features/list/listSlice";
import styles from "./List.module.scss";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface IProps {
  title: string;
  id: string;
  boardId: string;
}

const List = ({ title, boardId, id }: IProps) => {
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const titleRef = createRef<HTMLInputElement>();
  const [titleInput, setTitleInput] = useState("");
  const dispatch = useAppDispatch();

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleInput === "") {
      setIsOpenTitle(false);
      setTitleInput(title);
    }
    if (titleInput === title) {
      setIsOpenTitle(false);
    } else {
      dispatch(updateList({ listId: id, title: titleInput }));
      setIsOpenTitle(false);
    }
  };

  const handleTitleOnBlur = () => {
    if (titleInput === "") {
      setIsOpenTitle(false);
      setTitleInput(title);
    }

    if (titleInput === title) {
      setIsOpenTitle(false);
    } else {
      dispatch(updateList({ listId: id, title: titleInput }));
      setIsOpenTitle(false);
    }
  };

  const handleOpen = () => {
    setIsOpenTitle(true);
    setTitleInput(title);
  };

  const deleteListHandler = () => {
    dispatch(removeList({ listId: id, boardId }));
  };

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        {isOpenTitle ? (
          <form onSubmit={handleTitleSubmit} className={styles.listForm}>
            <input
              type="text"
              name="title"
              id="title"
              ref={titleRef}
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
              autoFocus
              onBlur={handleTitleOnBlur}
            />
          </form>
        ) : (
          <h2 onClick={handleOpen}>{title}</h2>
        )}
        <button
          type="button"
          className={styles.removeList}
          onClick={deleteListHandler}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default List;
