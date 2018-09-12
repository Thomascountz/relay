import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneSignal = props => {
  return (
    <h2 className="tone">
      <span className={"dot " + getClassFor(props.name)} />
      {props.name} {renderScore(props.score)}
    </h2>
  );
};

const getClassFor = name => {
  return (name + "-dot").toLowerCase();
};

const renderScore = score => {
  return (parseFloat(score) * 10).toFixed(1).toString();
};

export default hot(module)(ToneSignal);
