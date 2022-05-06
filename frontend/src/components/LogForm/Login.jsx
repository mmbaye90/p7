import React, { useState } from 'react';
import "./stylesLogForm/login.css"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = (e) => {
      e.preventDefault();
      const errorLog = document.querySelector(".errLog");
  
      axios({
        method: "post",
        url: "http://localhost:3000/api/users/login",
        data: {
          email,
          password,
        },

      })
        .then((res) => {
          console.log(res);
          if (res) {
            window.location = "/";
          } 
        })
        .catch((err) => {
          console.log(err.response.data.message);
          errorLog.innerHTML = err.response.data.message;          
        });
    };
  
    return (
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <div className="errLog"></div>
        <br />
        <input type="submit" value="Se connecter" />
      </form>
    );};

export default Login;