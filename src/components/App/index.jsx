import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import Sentiment from "../../sentiment";

import Editor from "../Editor/index";
import ToneBar from "../ToneBar";

class App extends React.Component {
  state = {
    documentTones: [],
    sentencesTones: []
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
    return Sentiment.analyze(text)
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
