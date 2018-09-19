import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import nativeUI from "../../nativeUI";
import Sentiment from "../../sentiment";

import Editor from "../Editor/index";
import ToneBar from "../ToneBar";

class App extends React.Component {
  state = {
    documentText: "",
    documentTones: [],
    sentencesTones: []
  };

  render() {
    return (
      <div className="app container">
        <ToneBar tones={this.state.documentTones} />
        <Editor
          value={this.state.documentText}
          handleChange={this.handleChange.bind(this)}
          handleSaveClick={this.handleSaveClick.bind(this)}
          handleOpenClick={this.handleOpenClick.bind(this)}
          handleAnalyzeClick={this.handleAnalyzeClick.bind(this)}
        />
      </div>
    );
  }

  handleChange(event) {
    this.setState({ documentText: event.currentTarget.value });
  }

  handleSaveClick() {
    nativeUI.promptUserToSaveContentToFile(this.state.documentText);
  }

  handleOpenClick() {
    nativeUI.promptUserToOpenFileContents().then(fileContents => {
      this.setState({ documentText: fileContents });
    });
  }

  handleAnalyzeClick() {
    return Sentiment.analyze(this.state.documentText)
      .then(result => {
        return result;
      })
      .then(result => {
        this.setState({
          documentTones: result.document_tone.tones,
          sentencesTones: result.sentences_tones
        });
      })
      .catch(() => {
        // noop
      });
  }
}

export default hot(module)(App);
