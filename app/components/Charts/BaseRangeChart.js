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

  getData(precision, toFixed) {
    const options = this.getOptionsForChart();

    let data;
    const range = this.getRangeForChart({
      options,
      precision,
      toFixed,
      margin: 1,
      minTotal: 7
    });
    data = this.getDataWithRange({ options, range, precision, toFixed });

    return data;
  }

  getDataWithRange({ options, range, precision, toFixed }) {
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
    let options = this.getOptionKeys(questionFilter);
    options.sort();
    return options;
  }

  getOptionKeys({ id, type, options }) {
    const optionsKeys = Object.keys(options);
    return optionsKeys.map(key => options[key]);
  }

  getRangeForChart({ options, precision, toFixed, margin, minTotal }) {
    const xValues = options.map(option => option.name);
    let range = this.getArrayRange(xValues, toFixed);
    range = margin ? this.addMarinToRange(range, precision, margin) : range;
    range = minTotal
      ? this.setMinTotalValuesToRange(range, precision, minTotal)
      : range;
    return range;
  }

  fixFloats(values) {
    return values.map(value => Number(value.toFixed()));
  }

  getArrayRange(array, toFixed) {
    const values = toFixed ? this.fixFloats(array) : array;

    const min = Math.min(...values);
    const max = Math.max(...values);
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
