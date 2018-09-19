import React from "react";
import { hot } from "react-hot-loader";
import "./styles.css";

const ToneMat = props => {
  return <div className="toneMat">{props.value}</div>;
};

export default hot(module)(ToneMat);
