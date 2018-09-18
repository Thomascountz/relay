import React, { Component } from "react";
import nativeUI from "../../nativeUI";
import ContentEditable from "react-contenteditable";
import { hot } from "react-hot-loader";
import "./styles.css";

class Editor extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSaveClick = () => {
    nativeUI.promptUserToSaveContentToFile(this.state.value);
  };

  handleOpenClick = () => {
    nativeUI.promptUserToOpenFileContents().then(fileContents => {
      this.setState({ value: fileContents.toString() });
    });
  };

  render() {
    return (
      <div>
        <button
          className="button analyzeButton"
          onClick={() => {
            this.props.handleAnalyzeClick(this.state.value);
          }}
        >
          Analyze
        </button>
        <button className="button saveButton" onClick={this.handleSaveClick}>
          Save
        </button>
        <button className="button openButton" onClick={this.handleOpenClick}>
          Open
        </button>
        <ContentEditable
          html={this.state.value}
          autoFocus="true"
          className="editorTextArea"
          onChange={e => {
            this.handleChange(e);
          }}
        />
      </div>
    );
  }
}

export default hot(module)(Editor);
