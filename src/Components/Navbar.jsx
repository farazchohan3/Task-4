import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Store/firebase";
export default function Navbar() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const onClickHandler = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <div className={classes.navWrapper}>
      <nav className={classes.nav}>
        <h1>Firebase Auth</h1>
        <ul className={classes.LinkList}>
          <li>
            <Link className={classes.navLink} to="/">
              About us
            </Link>
          </li>
          <li>
            <Link className={classes.navLink} to="/">
              Contact Us
            </Link>
          </li>

          <button
            className={classes.logoutButton}
            type="submit"
            onClick={onClickHandler}
          >
            {" "}
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
}
