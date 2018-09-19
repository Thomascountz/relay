import React, { Component } from "react";
import nativeUI from "../../nativeUI";
import ContentEditable from "react-contenteditable";
import { hot } from "react-hot-loader";
import "./styles.css";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    html: ""
  };

  componentWillReceiveProps({ sentencesTones }) {
    console.log(sentencesTones);
    let newValue = this.state.html;
    if (sentencesTones !== undefined) {
      for (let sentenceTone of sentencesTones) {
        if (sentenceTone.tones.length != 0) {
          const annotated = `<span class="${sentenceTone.tones[0].tone_id}">${
            sentenceTone.text
          }</span>`;
          newValue = newValue.replace(sentenceTone.text, annotated);
        }
      }
      this.setState({ html: newValue });
      console.log(newValue);
    }
  }

  clearAnnotatedText = html => {
    return html.replace(/<\/*span[^>]*>/g, "");
  };

  handleChange = event => {
    this.setState({ html: this.clearAnnotatedText(event.target.value) });
  };

  handleSaveClick = () => {
    nativeUI.promptUserToSaveContentToFile(this.state.html);
  };

  handleOpenClick = () => {
    nativeUI.promptUserToOpenFileContents().then(fileContents => {
      this.setState({ html: fileContents.toString() });
    });
  };

  render() {
    return (
      <div>
        <button
          className="button analyzeButton"
          onClick={() => {
            this.props.handleAnalyzeClick(
              this.state.html.replace(/<.*?>/g, " ").trim()
            );
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
          contentEditable="plaintext-only"
          html={this.state.html}
          autoFocus="true"
          className="editorTextArea"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default hot(module)(Editor);
