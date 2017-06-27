import React, { Component } from "react";
import { scaleTime } from "d3-scale";
import BaseRangeChart from "./BaseRangeChart";
import RangeChart from "./RangeChart";
import { timeFormatES } from "../../utils";

const oneDayMilliseconds = 24 * 60 * 60 * 1000;

class DateRangeChart extends BaseRangeChart {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ xValue: new Date().getTime(), yValue: 0 }]
    };
  }

  componentDidMount() {
    this.setChartData();
  }

  setChartData() {
    const data = this.getData(oneDayMilliseconds);
    this.setState({ ...this.state, data });
  }

  render() {
    const { data } = this.state;

    return (
      <RangeChart
        data={data}
        xTickFormat={d => timeFormatES(d)}
        xScale={scaleTime()}
        handleBrush={this.handleBrush}
        handleClearBrush={this.handleClearBrush}
      />
    );
  }
}

export default DateRangeChart;
