import React, { Component } from "react";
import nativeUI from "../../nativeUI";
import { hot } from "react-hot-loader";
import "./styles.css";
import sentiment from "../../sentiment";

class Editor extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSaveClick = () => {
    nativeUI.promptUserToSaveContentToFile(this.state.value);
  };

  handleOpenClick = () => {
    nativeUI.promptUserToOpenFileContents().then(fileContents => {
      this.setState({ value: fileContents });
    });
  };

  handleAnalyzeClick = () => {
    sentiment.analyze(this.state.value);
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
        <button
          className="button analyzeButton"
          onClick={this.handleAnalyzeClick}
        >
          Analyze
        </button>
        <button className="button saveButton" onClick={this.handleSaveClick}>
          Save
        </button>
        <button className="button openButton" onClick={this.handleOpenClick}>
          Open
        </button>
      </div>
    );
  }
}

export default hot(module)(Editor);
