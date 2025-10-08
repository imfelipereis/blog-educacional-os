import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="logo" src="/logo-osasco.jpeg" alt="Logo Osasco" />
        </Link>
        <nav className="nav-menu">
          <ul>
            <li>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;