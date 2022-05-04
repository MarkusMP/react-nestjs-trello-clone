import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import { GoGear } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getBoardById, reset } from "../../features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import UpdateBoardModal from "../../components/UpdateBoardModal/UpdateBoardModal";
import { CgMathPlus } from "react-icons/cg";
import {
  createList,
  getAllLists,
  moveList,
  reset as listReset,
  updateListMoved,
} from "../../features/list/listSlice";
import List from "../../components/List/List";
import { toast } from "react-toastify";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { UseHorizontalScroll } from "../../components/UseHorizontalScroll/UseHorizontalScroll";

const Board = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const [isCreateOpen, SetIsCreateOpen] = useState(false);
  const [isImage, SetIsImage] = useState(true);
  const [title, setTitle] = useState("");
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);
  const { lists, message, errorMessage } = useAppSelector(
    (state) => state.list
  );

  const scrollRef = UseHorizontalScroll() as any;

  const handleOpen = () => {
    SetIsOpen(true);
  };

  const handleClose = () => {
    SetIsOpen(false);
  };

  useEffect(() => {
    dispatch(getBoardById(boardId as string));

    dispatch(getAllLists(boardId as string));

    return () => {
      dispatch(reset());
    };
  }, [boardId, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(listReset());
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(listReset());
    }
  }, [message, errorMessage, dispatch]);

  useEffect(() => {
    if (board?.background.startsWith("#")) {
      SetIsImage(false);
    } else {
      SetIsImage(true);
    }
  }, [board?.background]);

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createList({ title, boardId: board!.id }));
    setTitle("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const list = Array.from(lists);
    const [newOrder] = list.splice(source.index, 1);
    list.splice(destination.index, 0, newOrder);

    dispatch(updateListMoved(list));

    dispatch(moveList({ listId: draggableId, index: destination.index }));
  };

  return (
    <>
      {!board && <Spinner />}
      {board && (
        <div
          className={styles.board}
          style={
            isImage
              ? {
                  backgroundImage: `url(${board.background})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }
              : {
                  backgroundColor: board.background,
                }
          }
        >
          <div className={styles.top}>
            <div className={styles.container}>
              <h4>{board.title}</h4>

              <GoGear onClick={handleOpen} />
            </div>
          </div>

          <div className={styles.lists} ref={scrollRef}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.flex}
                  >
                    {lists &&
                      lists.map((list, index) => (
                        <Draggable
                          key={list.id}
                          draggableId={list.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <List
                                title={list.title}
                                id={list.id}
                                boardId={boardId as string}
                                cards={list.cards}
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

            {isCreateOpen ? (
              <form className={styles.addListForm} onSubmit={handleCreateList}>
                <input
                  type="text"
                  placeholder="Enter list title..."
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
                <div className={styles.addListBtns}>
                  <button type="submit" className={styles.btnAddList}>
                    Add list
                  </button>
                  <button
                    type="button"
                    onClick={() => SetIsCreateOpen(false)}
                    className={styles.closeAddList}
                  >
                    X
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.add} onClick={() => SetIsCreateOpen(true)}>
                <h4>
                  <CgMathPlus />
                  {lists.length === 0 ? "Add a list" : "Add another list"}
                </h4>
              </div>
            )}
          </div>
          <UpdateBoardModal
            closeModal={handleClose}
            open={isOpen}
            boardId={boardId as string}
          />
        </div>
      )}
    </>
  );
};

export default Board;
