import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const Editor = props => {
  return (
    <div>
      <button
        className="button analyzeButton"
        onClick={props.handleAnalyzeClick}
      >
        Analyze
      </button>
      <button className="button saveButton" onClick={props.handleSaveClick}>
        Save
      </button>
      <button className="button openButton" onClick={props.handleOpenClick}>
        Open
      </button>
      <textarea
        autoFocus="true"
        className="editorTextArea"
        onChange={e => {
          props.handleChange(e);
        }}
        value={props.value}
      />
    </div>
  );
};

export default hot(module)(Editor);
