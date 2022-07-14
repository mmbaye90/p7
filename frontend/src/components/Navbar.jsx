import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../contexts/Auth";
import { logout } from "../services/AuthApi";
import "./navbar.css"
import logo from "../img/logo.png"

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  }

  return (
    <nav className="navbar">
      <span className="containerLogo"><img src={logo} alt="logo"  /></span>

      <div className="containerItmamNav" >
        <ul >
          <li className="nav-item">
            <NavLink className="nav-link" to="/"activeClassName="active1">
              Accueil
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/posts"activeClassName="active">
              Posts
            </NavLink>
          </li> */}
        </ul>
        <ul className="ul2">
          { (!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName="active">
                  Se connecter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" activeClassName="active">
                  S'enregistrer
                </NavLink>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/account"activeClassName="active">
                  Mon compte
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn" onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
