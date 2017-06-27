import React from "react";
import { series } from "react-stockcharts";
const { SquareMarker } = series;

const Marker = props => {
  const { point } = props;
  const yValue = point.datum.yValue;

  if (!yValue || yValue === 0) {
    return null;
  } else {
    return <SquareMarker {...props} />;
  }
};

export default Marker;
