import React, { Component } from "react";
import { promptUserToSaveContentToFile } from "../../nativeUI";
import { hot } from "react-hot-loader";
import "./styles.css";

class Editor extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleClick = () => {
    promptUserToSaveContentToFile(this.state.value);
  };

  render() {
    return (
      <div className="container">
        <textarea
          autoFocus="true"
          className="editorTextArea"
          onChange={e => {
            this.handleChange(e);
          }}
          value={this.state.value}
        />
        <button className="saveButton" onClick={this.handleClick}>
          Save
        </button>
      </div>
    );
  }
}

export default hot(module)(Editor);
