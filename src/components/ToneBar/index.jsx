import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import ToneSignal from "../ToneSignal/index";

const ToneBar = props => {
  const scores = getScores(props.tones);
  return (
    <div className="tone-bar">
      <ToneSignal name="analytical" score={scores.analytical} />
      <ToneSignal name="anger" score={scores.anger} />
      <ToneSignal name="confident" score={scores.confident} />
      <ToneSignal name="fear" score={scores.fear} />
      <ToneSignal name="joy" score={scores.joy} />
      <ToneSignal name="sadness" score={scores.sadness} />
      <ToneSignal name="tentative" score={scores.tentative} />
    </div>
  );
};

const getScores = tones => {
  return tones.reduce((scores, tone) => {
    scores[tone.tone_id] = formatScore(tone.score);
    return scores;
  }, {});
};

const formatScore = score => {
  return (parseFloat(score) * 10).toFixed(1).toString();
};

export default hot(module)(ToneBar);
