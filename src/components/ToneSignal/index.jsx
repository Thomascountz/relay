import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneSignal = props => {
  return (
    <div className="tone-signal">
      <div className="tone">
        <span className={"dot " + getClassFor(props.name)} />
        {renderName(props.name)} {renderScore(props.score)}
      </div>
    </div>
  );
};

const getClassFor = name => {
  return (name + "-dot").toLowerCase();
};

const renderName = name => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const renderScore = score => {
  if (score === undefined) {
    return 0;
  } else {
    return (parseFloat(score) * 10).toFixed(1).toString();
  }
};

export default hot(module)(ToneSignal);
