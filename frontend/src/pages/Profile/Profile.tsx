import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ModalComponent from "../../components/Modal/Modal";
import { authenticated } from "../../features/auth/authSlice";
import {
  deleteProfile,
  getProfile,
  reset,
  updateProfile,
} from "../../features/profile/profileSlice";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { errorMessage, user, message } = useAppSelector(
    (state) => state.profile
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile({ email, password }));
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (user) {
      setEmail(user.email);
    }
    if (message === "User updated successfully") {
      toast.success(message);
      navigate("/dashboard");
    }

    if (message === "User deleted successfully") {
      toast.success(message);
      dispatch(authenticated());
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, errorMessage, message, navigate]);

  const handleDeleteProfile = () => {
    dispatch(deleteProfile());
  };

  return (
    <div className={styles.container}>
      <section>
        <h1>
          <FaUser /> Update Profile
        </h1>
      </section>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Change email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Change email..."
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Change password</label>

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Change password..."
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <button type="submit" className={styles.btn}>
              Update Profile
            </button>
          </div>
        </form>
      </section>
      <section className={styles.delete}>
        <h1>
          <FaUser /> Delete Profile
        </h1>
      </section>
      <section className={styles.form}>
        <form>
          <div className={styles.formGroup}>
            <button
              type="button"
              onClick={onOpen}
              className={`${styles.btn} ${styles.deleteBtn}`}
            >
              Delete Profile
            </button>
          </div>
        </form>
      </section>
      <ModalComponent
        closeModal={onClose}
        handleDelete={handleDeleteProfile}
        title={"Delete Profile"}
        description={"Are you sure you want to delete your profile?"}
        open={isOpen}
      />
    </div>
  );
};

export default Profile;
