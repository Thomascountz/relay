import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import Editor from "../Editor/index";

const App = () => {
  return (
    <div className="app">
      <h1> Hello, World! </h1>
      <Editor />
    </div>
  );
};

export default hot(module)(App);
