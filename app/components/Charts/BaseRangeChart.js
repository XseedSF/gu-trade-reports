import React, { Component } from "react";

class BaseRangeChart extends Component {
  constructor(props) {
    super(props);

    this.handleBrush = this.handleBrush.bind(this);
    this.handleClearBrush = this.handleClearBrush.bind(this);
  }

  handleBrush({ left, right }) {
    const { id, type } = this.props.questionFilter;
    this.props.toggleFilter(id, type, [left, right]);
  }

  handleClearBrush() {
    const { id, type } = this.props.questionFilter;
    this.props.toggleFilter(id, type, null);
  }

  getData(precision) {
    const options = this.getOptionsForChart(this.props.questionFilter);
    const xValues = options.map(option => option.name);

    let data;
    if (precision) {
      const range = this.getRangeForChart({
        xValues,
        precision,
        margin: 1,
        minTotal: 7
      });
      data = this.getDataWithFullRange(options, range, precision);
    } else {
      data = xValues;
    }

    return data;
  }

  getDataWithFullRange(options, range, precision) {
    const data = [];
    let current = range.min;
    while (current <= range.max) {
      let count = 0;
      const completedData = options.find(opt => opt.name === current);
      if (completedData) {
        count = completedData.value;
      }
      data.push({ xValue: current, yValue: count });
      current += precision;
    }

    return data;
  }

  // private methods.
  getOptionsForChart({ id, type, options }) {
    const optionsKeys = Object.keys(options);
    return optionsKeys.map(key => options[key]);
  }

  getRangeForChart({ xValues, precision, margin, minTotal }) {
    let range = this.getArrayRange(xValues);
    range = margin ? this.addMarinToRange(range, precision, margin) : range;
    range = minTotal
      ? this.setMinTotalValuesToRange(range, precision, minTotal)
      : range;
    return range;
  }

  getArrayRange(array) {
    const min = Math.min(...array);
    const max = Math.max(...array);
    return { min, max };
  }

  addMarinToRange(range, precision, marginCount) {
    const margin = marginCount * precision;
    const min = range.min - margin;
    const max = range.max + margin;
    return { min, max };
  }

  setMinTotalValuesToRange(range, precision, minTotal = 0) {
    let rangeCount = this.getRangeCount(range, precision);
    let result = range;
    while (rangeCount < minTotal) {
      if (rangeCount % 2 === 0) {
        const min = result.min - precision;
        result = { ...result, min };
      } else {
        const max = result.max + precision;
        result = { ...result, max };
      }
      rangeCount++;
    }
    return result;
  }

  getRangeCount(range, precision) {
    return (range.max - range.min) / precision;
  }
}

export default BaseRangeChart;
