import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticated, login, reset } from "../../features/auth/authSlice";
import styles from "./Home.module.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const { message, errorMessage, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(authenticated());
    }

    if (isAuthenticated) {
      navigate("/dashboard");
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }

    return () => {
      dispatch(reset());
    };
  }, [message, errorMessage, dispatch, navigate, isAuthenticated]);

  const handleLogin = () => {
    dispatch(login({ email: "test@test.com", password: "password" }));
  };
  return (
    <div className={styles.container}>
      <h1>Telio (Trello clone)</h1>
      <button className={styles.btn} onClick={handleLogin}>
        Login with test account
      </button>
    </div>
  );
};

export default Home;
