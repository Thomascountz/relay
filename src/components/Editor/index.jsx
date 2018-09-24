import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import Textarea from "react-textarea-autosize";

const Editor = props => {
  return (
    <div>
      <Textarea
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
