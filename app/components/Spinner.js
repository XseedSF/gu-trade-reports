import React from "react";
import ReactLoader from "react-loader";
import { COLORS } from "../constants";

const defaultOptions = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  scale: 0.5,
  corners: 1,
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  top: "50%",
  left: "50%",
  shadow: false,
  hwaccel: false,
  position: "absolute"
};

const Spinner = ({ color }) => {
  var options = Object.assign({}, defaultOptions, { color });

  return <ReactLoader loaded={false} options={options} className="spinner" />;
};

Spinner.defaultProps = {
  color: COLORS.PRIMARY
};

export default Spinner;
