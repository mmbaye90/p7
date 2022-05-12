import React, { useEffect, useState, useContext } from "react";
import Auth from "../../contexts/Auth";
import { login } from "../../services/AuthApi";
import "../stylesPages/login.css"


const Login = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleChange = ({currentTarget}) => {
    const { name, value } = currentTarget;

    setUser({...user, [name]: value})
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await login(user);
      setIsAuthenticated(response);
      history.replace('/account');
    } catch ({ response }) {
      console.log(response);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/account');
    }
  }, [history, isAuthenticated]);

  return (
    <div className="login">
        <form action="" onSubmit={handleSubmit} id="sign-up-form">
            <h1>Connexion</h1>
        <label htmlFor="email">Email</label>
    <br />
    <input
      type="text"
      name="email"
      id="email"
      onChange={handleChange}
    />
    <div className="email error"></div>
    <br />
    <label htmlFor="password">Mot de passe</label>
    <br />
    <input
      type="password"
      name="password"
      id="password"
      onChange={handleChange}
    />
    <div className="password error"></div>
    <br />
    <input type="submit" value="Se connecter" id="validation" />
    <br />
    <div className="errinscription"></div>
  </form>
  </div>
  );
};

export default Login;
