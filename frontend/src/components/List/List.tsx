import React, { useState, createRef } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  removeList,
  updateList,
  createCard,
  changeCardPosition,
  updateCardMoved,
} from "../../features/list/listSlice";
import styles from "./List.module.scss";
import { CgMathPlus } from "react-icons/cg";
import { ICard } from "../../features/list/listInterface";
import Card from "../Card/Card";
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
  cards: ICard[];
}

const List = ({ title, boardId, id, cards }: IProps) => {
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const titleRef = createRef<HTMLInputElement>();
  const [titleInput, setTitleInput] = useState("");
  const [titleCard, setTitleCard] = useState("");
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

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCard({ listId: id, title: titleCard }));
    setTitleCard("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const newCards = Array.from(cards);
    const [newOrder] = newCards.splice(source.index, 1);
    newCards.splice(destination.index, 0, newOrder);

    dispatch(updateCardMoved({ cards: newCards, listId: id }));

    dispatch(
      changeCardPosition({
        cardId: draggableId,
        listId: id,
        index: destination.index,
      })
    );
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
      <div className={styles.cards}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards &&
                  cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            title={card.title}
                            id={card.id}
                            listId={card.listId}
                            description={card.description}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className={styles.bottom}>
        {isOpenCreate ? (
          <form className={styles.addListForm} onSubmit={handleCreateList}>
            <textarea
              placeholder="Enter a title for this card..."
              id="title"
              name="title"
              value={titleCard}
              onChange={(e) => setTitleCard(e.target.value)}
              required
              maxLength={50}
              autoFocus
            />
            <div className={styles.addListBtns}>
              <button type="submit" className={styles.btnAddList}>
                Add card
              </button>
              <button
                type="button"
                onClick={() => setIsOpenCreate(false)}
                className={styles.closeAddList}
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.add} onClick={() => setIsOpenCreate(true)}>
            <h4>
              <CgMathPlus /> Add a card
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
