import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import "./stylesForm/signupForm.css"

const SignUpForm = () => {
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
            <h4>
              Enregistrement réussi, veuillez-vous connecter
            </h4>
            <SignInForm />
            
          </>
        ) : (
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <h1>Inscription</h1>
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
            <input type="submit" value="Inscription" id="validation"/>
            <br />
            <div className="errinscription"></div>
          </form>
        )}
      </>
    ) 
};

export default SignUpForm;