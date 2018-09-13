import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import Editor from "../Editor/index";
import ToneBar from "../ToneBar";

const App = () => {
  return (
    <div className="app container">
      <h1 className="title"> Hello, Relay! </h1>
      <ToneBar />
      <Editor />
    </div>
  );
};

export default hot(module)(App);
