import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import RangeChart from "./RangeChart";
import BaseRangeChart from "./BaseRangeChart";
import { COLORS } from "../../constants";

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
