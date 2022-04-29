import React, { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import { GoGear } from "react-icons/go";
import { useParams } from "react-router-dom";
import { getBoardById, reset } from "../../features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner/Spinner";
import UpdateBoardModal from "../../components/UpdateBoardModal/UpdateBoardModal";

const Board = () => {
  const [isOpen, SetIsOpen] = useState(false);
  const [isImage, SetIsImage] = useState(true);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.board);

  const handleOpen = () => {
    SetIsOpen(true);
  };

  const handleClose = () => {
    SetIsOpen(false);
  };

  useEffect(() => {
    dispatch(getBoardById(boardId as string));

    return () => {
      dispatch(reset());
    };
  }, [boardId, dispatch]);

  useEffect(() => {
    if (board?.background.startsWith("#")) {
      SetIsImage(false);
    } else {
      SetIsImage(true);
    }
  }, [board?.background]);

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
          <div></div>
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
