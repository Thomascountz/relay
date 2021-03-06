import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneSignal = props => {
  return (
    <div className="tone-signal">
      <div className={"dot " + getDotClassFor(props.name)}>
        {renderScore(props.score)}
      </div>
      <div>{renderName(props.name)}</div>
    </div>
  );
};

const getDotClassFor = name => {
  return (name + "-dot").toLowerCase();
};

const renderName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const renderScore = score => {
  return score || "0";
};

export default hot(module)(ToneSignal);
