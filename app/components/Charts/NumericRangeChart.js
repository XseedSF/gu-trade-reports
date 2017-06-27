import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import RangeChart from "./RangeChart";
import BaseRangeChart from "./BaseRangeChart";

class NumericRangeChart extends BaseRangeChart {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ xValue: 0, yValue: 0 }]
    };
  }

  componentDidMount() {
    this.setChartData();
  }

  setChartData() {
    const data = this.getData(1, true);
    this.setState({ ...this.state, data });
  }

  render() {
    const { data } = this.state;

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
