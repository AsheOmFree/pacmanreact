import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "../src/pacman/pacman.css";
import { BrowserRouter as Link } from "react-router-dom";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/pacman");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="background-ting">
      <div className="galaxy-pacman">
        <h1 className="login-title">
          Log in or <a href="/signup"> Sign up</a> to Play Pacman
        </h1>
        <form onSubmit={handleLogin} className="login-form">
          <label>
            Email <input name="email" type="email" placeholder="Email" />{" "}
          </label>
          <label>
            {" "}
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>

          <button className="LoginPageButton" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Login);
