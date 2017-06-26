import React, { Component } from "react";
import { dictionaryToArray } from "../../utils";

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

  getData(precision, toFixed) {
    const options = this.getOptionsForChart();

    let data;
    const xValues = this.getXValues(options, toFixed);
    const range = this.getRangeForChart({
      xValues,
      precision,
      toFixed,
      margin: 1,
      minTotal: 7
    });
    data = this.getDataBetweenRange({ options, range, precision });

    return data;
  }

  getXValues(options, toFixed) {
    return options.map(
      option => (toFixed ? Number(option.name.toFixed()) : option.name)
    );
  }

  getDataBetweenRange({ options, range, precision }) {
    let data = [];
    let current = range.min;

    while (current <= range.max) {
      let count = 0;
      const completedData = options.find(option => option.name === current);
      if (completedData) {
        count = completedData.value;
      }
      data.push({ xValue: current, yValue: count });
      data = this.addValuesBetweenSteps(data, options, current, precision);

      current += precision;
    }

    return data;
  }

  addValuesBetweenSteps(data, options, current, precision) {
    const next = current + precision;
    const optionsToAdd = options.filter(
      option => option.name > current && option.name < next
    );

    const result = data;
    if (optionsToAdd) {
      for (const option of optionsToAdd) {
        result.push({ xValue: option.name, yValue: option.value });
      }
    }

    return result;
  }

  // private methods.
  getOptionsForChart() {
    const { questionFilter } = this.props;
    let options = dictionaryToArray(questionFilter.options);
    options.sort();
    return options;
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
