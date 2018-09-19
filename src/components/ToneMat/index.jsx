import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneMat = props => {
  return (
    <div
      className="toneMat"
      dangerouslySetInnerHTML={{
        __html: getAnnotatedSentences(props.value, props.sentencesTones)
      }}
    />
  );
};

const getAnnotatedSentences = (sentences, sentencesTones) => {
  let annotatedSentences = clearHTML(sentences);

  if (sentenceTonesExist(sentencesTones)) {
    for (let sentenceTone of sentencesTones) {
      if (tonesExistForThisSentence(sentenceTone)) {
        let sentenceText = getSentenceText(sentenceTone);
        let toneID = getFirstToneID(sentenceTone);

        annotatedSentences = annotatedSentences.replace(
          sentenceText,
          annotateString(sentenceText, toneID)
        );
      }
    }
  }

  return annotatedSentences;
};

const clearHTML = content => {
  return escapeHTML(clearPreviousAnnotations(content));
};

const clearPreviousAnnotations = content => {
  return content.replace(/<\/*span[^>]*>/g, "");
};

const escapeHTML = content => {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const sentenceTonesExist = sentenceTones => {
  return !!sentenceTones;
};

const tonesExistForThisSentence = sentenceTone => {
  return !!sentenceTone.tones[0];
};

const getFirstToneID = sentenceTone => {
  return sentenceTone.tones[0].tone_id;
};

const getSentenceText = sentenceTone => {
  return sentenceTone.text;
};

const annotateString = (string, className) => {
  return `<span class="${className}">${string}</span>`;
};

export default hot(module)(ToneMat);
