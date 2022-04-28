import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateBoardModal from "../../components/CreateBoardModal/CreateBoardModal";
import { getAllBoards, reset } from "../../features/board/boardSlice";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { boards } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBoards());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <h3>
          <FaUser /> Personal Boards
        </h3>
        <div className={styles.boards}>
          {boards &&
            boards.map((board) => (
              <div className={styles.board} key={board.id}>
                <h4>{board.title}</h4>
              </div>
            ))}
          <button className={styles.boardBtn} onClick={openModal}>
            Create new board...
          </button>
        </div>
      </div>
      <CreateBoardModal open={isOpen} closeModal={closeModal} />
    </section>
  );
};

export default Dashboard;
