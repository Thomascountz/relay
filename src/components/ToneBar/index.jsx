import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

import ToneSignal from "../ToneSignal/index";

const ToneBar = props => {
  return (
    <div className="tone-bar">
      <ToneSignal name="analytical" />
      <ToneSignal name="anger" />
      <ToneSignal name="confident" />
      <ToneSignal name="fear" />
      <ToneSignal name="joy" />
      <ToneSignal name="sadness" />
      <ToneSignal name="tentative" />
    </div>
  );
};

export default hot(module)(ToneBar);
