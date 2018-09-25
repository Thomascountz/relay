import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import nativeUI from "../../nativeUI";
import Sentiment from "../../sentiment";

import Editor from "../Editor/index";
import ToneBar from "../ToneBar";
import ToneMat from "../ToneMat";

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
        <div className="buttons">
          <button
            className="button analyzeButton"
            onClick={this.handleAnalyzeClick.bind(this)}
          >
            Analyze
          </button>
          <button
            className="button saveButton"
            onClick={this.handleSaveClick.bind(this)}
          >
            Save
          </button>
          <button
            className="button openButton"
            onClick={this.handleOpenClick.bind(this)}
          >
            Open
          </button>
        </div>
        <div className="editor">
          <Editor
            value={this.state.documentText}
            handleChange={this.handleChange.bind(this)}
          />
          <ToneMat
            value={this.state.documentText}
            sentencesTones={this.state.sentencesTones}
          />
        </div>
      </div>
    );
  }

  handleChange(event) {
    if (this.sentenceIsFinished(event.currentTarget.value)) {
      this.handleAnalyzeClick();
    }
    this.setState({ documentText: event.currentTarget.value });
  }

  handleSaveClick() {
    nativeUI.promptUserToSaveContentToFile(this.toJSON());
  }

  handleOpenClick() {
    nativeUI.promptUserToOpenFileContents().then(fileContents => {
      try {
        this.setState(JSON.parse(fileContents));
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.setState({
            documentText: fileContents.toString(),
            documentTones: [],
            sentencesTones: []
          });
        } else {
          throw e;
        }
      }
    });
  }

  handleAnalyzeClick() {
    return Sentiment.analyze(this.state.documentText)
      .then(result => {
        this.setState({
          documentTones: result.document_tone.tones,
          sentencesTones: result.sentences_tone
        });
      })
      .catch(() => {
        // noop
      });
  }

  toJSON() {
    return JSON.stringify(this.state);
  }

  sentenceIsFinished(text) {
    return /[.?!]$/.test(text);
  }
}

export default hot(module)(App);
