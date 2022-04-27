import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaBars, FaSignInAlt, FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
