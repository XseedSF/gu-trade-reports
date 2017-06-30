import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import RangeChart from "./RangeChart";
import BaseRangeChart from "./BaseRangeChart";
import { COLORS } from "../../constants";

class NumericRangeChart extends BaseRangeChart {
  render() {
    const data = this.getData(1, true);
    const { filter } = this.props.questionFilter;
    const brushRange = filter ? { min: filter[0], max: filter[1] } : null;

    return (
      <RangeChart
        data={data}
        brushRange={brushRange}
        xScale={scaleLinear()}
        handleBrush={this.handleBrush}
        handleClearBrush={this.handleClearBrush}
        fill={COLORS.PRIMARY_OPTION}
      />
    );
  }
}

export default NumericRangeChart;
