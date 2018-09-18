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
        <Editor
          handleAnalyzeClick={this.handleAnalyzeClick.bind(this)}
          sentencesTones={this.state.sentencesTones}
        />
      </div>
    );
  }

  handleAnalyzeClick(text) {
    this.getTones(text)
      .then(tones => {
        this.setState({
          documentTones: tones.document_tone.tones,
          sentencesTones: tones.sentences_tone
        });
      })
      .catch(() => {
        // noop
      });
  }

  getTones(text) {
    return Sentiment.analyze(text)
      .then(results => {
        return results;
      })
      .catch(() => {
        // noop
      });
  }
}

export default hot(module)(App);
