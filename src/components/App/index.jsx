import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import Sentiment from "../../sentiment";

import Editor from "../Editor/index";
import ToneBar from "../ToneBar";

class App extends React.Component {
  state = {
    documentTones: []
  };

  render() {
    return (
      <div className="app container">
        <ToneBar tones={this.state.documentTones} />
        <Editor handleAnalyzeClick={this.handleAnalyzeClick.bind(this)} />
      </div>
    );
  }

  handleAnalyzeClick(text) {
    this.getDocumentTones(text)
      .then(tones => {
        this.setState({ documentTones: tones });
      })
      .catch(() => {
        // noop
      });
  }

  getDocumentTones(text) {
    return Sentiment.analyze(text)
      .then(results => {
        return results.document_tone.tones;
      })
      .catch(() => {
        // noop
      });
  }
}

export default hot(module)(App);
