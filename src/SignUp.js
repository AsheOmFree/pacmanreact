import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { BrowserRouter as Link } from "react-router-dom";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="background-ting">
      <div className="galaxy-pacman">
        <h1 className="signup-title">Sign up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button className="signUpButton" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
