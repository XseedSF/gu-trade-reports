import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import RangeChart from "./RangeChart";
import BaseRangeChart from "./BaseRangeChart";
import CustomBarChart from "./CustomBarChart";
import { COLORS } from "../../constants";
import { dictionaryToArray } from "../../utils";

class NumericRangeChart extends BaseRangeChart {
  static isDataTooLargeForRangeChart(questionFilter) {
    let options = dictionaryToArray(questionFilter.options);
    options.sort();
    return (
      !options ||
      (options[0] &&
        Math.abs(options[options.length - 1].key - options[0].key) > 1000)
    );
  }

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
