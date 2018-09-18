import React, { Component } from "react";
import nativeUI from "../../nativeUI";
import { hot } from "react-hot-loader";
import "./styles.css";

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
      </div>
    );
  }
}

export default hot(module)(Editor);
