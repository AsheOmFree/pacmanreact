import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./src/Home";
import Login from "./src/Login";
import SignUp from "./src/SignUp";
import { AuthProvider } from "./src/Auth";
import PrivateRoute from "./src/PrivateRoute";

const App = () => {
  console.log(process.env);
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
