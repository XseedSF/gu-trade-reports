import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import BaseRangeChart from "./BaseRangeChart";
import RangeChart from "./RangeChart";

class NumericRangeChart extends BaseRangeChart {
  constructor(props) {
    super(props);
    this.state = {
      points: [{ xValue: 0, yValue: 0 }]
    };
  }

  componentDidMount() {
    this.setChartData();
  }

  setChartData() {
    const points = this.getPoints(1);
    this.setState({ ...this.state, points });
  }

  render() {
    const { points: data } = this.state;

    return (
      <RangeChart
        data={data}
        xScale={scaleLinear()}
        handleBrush={this.handleBrush}
        handleClearBrush={this.handleClearBrush}
      />
    );
  }
}

export default NumericRangeChart;
