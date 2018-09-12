import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneSignal = props => {
  return (
    <h2 className="name">
      <span className={"dot " + getClassFor(props.name)} />
      {props.name}
    </h2>
  );
};

const getClassFor = name => {
  return "joy-tone";
};

export default hot(module)(ToneSignal);
