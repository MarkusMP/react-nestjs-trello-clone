import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaBars, FaSignInAlt, FaUser } from "react-icons/fa";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className={`${styles.navigation} ${styles.container}`}>
        <div className={styles.logo}>
          <li>
            <Link to="/">Telio</Link>
          </li>
        </div>
        <ul
          className={
            isOpen
              ? `${styles.open} ${styles.links}`
              : `${styles.close} ${styles.links}`
          }
        >
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUser /> Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className={styles.menu}>
          <button type="button" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
