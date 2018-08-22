import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const Editor = () => {
  return (
    <div className="container">
      <textarea autoFocus="true" className="editorTextArea" />
    </div>
  );
};

export default hot(module)(Editor);
