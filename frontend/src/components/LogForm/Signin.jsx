import React from 'react'
import Login from "./Login";
import axios from 'axios';
import { useState } from "react";

const Signin = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const errorRegister = document.querySelector(".errinscription");
      axios({
        method: "post",
        url: "http://localhost:3000/api/users/register",
        data: {
          pseudo,
          email,
          password,
        },

      })
        .then((res) => {
          console.log(res);
          if (res) {
            setFormSubmit(true);
          } 
        })
        .catch((err) => {
          console.log(err);
          errorRegister.innerHTML = err.response.data.message;          
        });
    };
  
    return (
      <>
        {formSubmit ? (
          <>
            <Login />
            <span></span>
            <h4 className="success">
              Enregistrement réussi, veuillez-vous connecter
            </h4>
          </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <br />
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
            <input type="submit" value="Inscription" />
            <br />
            <div className="errinscription"></div>

          </form>
        )}
      </>
    );};

export default Signin;