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
              {/* <Link to="/avisos" className="menu">
                Página de Avisos
              </Link> */}
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;