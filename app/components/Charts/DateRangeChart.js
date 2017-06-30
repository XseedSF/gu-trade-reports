import React, { Component } from "react";
import { scaleTime } from "d3-scale";
import RangeChart from "./RangeChart";
import BaseRangeChart from "./BaseRangeChart";
import { timeFormatES } from "../../utils";
import { COLORS } from "../../constants";

const oneDayMilliseconds = 24 * 60 * 60 * 1000;

class DateRangeChart extends BaseRangeChart {
  render() {
    const data = this.getData(oneDayMilliseconds);
    const { filter } = this.props.questionFilter;
    const brushRange = filter ? { min: filter[0], max: filter[1] } : null;

    return (
      <RangeChart
        data={data}
        brushRange={brushRange}
        xTickFormat={d => timeFormatES(d)}
        xScale={scaleTime()}
        handleBrush={this.handleBrush}
        handleClearBrush={this.handleClearBrush}
        fill={COLORS.PRIMARY_OPTION}
      />
    );
  }
}

export default DateRangeChart;
