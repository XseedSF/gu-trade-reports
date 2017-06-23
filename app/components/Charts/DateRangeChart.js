import React, { Component } from "react";
import * as dateUtils from "../../utils/dates";
import { scaleTime } from "d3-scale";
import RangeChart from "./RangeChart";

class DateRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [{ xValue: new Date().getTime(), yValue: 0 }]
    };

    this.handleBrush = this.handleBrush.bind(this);
    this.handleClearBrush = this.handleClearBrush.bind(this);
  }

  componentDidMount() {
    this.setChartData();
  }

  setChartData() {
    const points = this.getPoints();
    this.setState({ ...this.state, points });
  }

  getPoints() {
    const data = this.getDataForChart(this.props.questionFilter);
    const datesRange = this.getDatesRange(data);

    const points = [];
    let time = datesRange.min;
    while (time <= datesRange.max) {
      let count = 0;
      const completedDate = data.find(d => d.name === time);
      if (completedDate) {
        count = completedDate.value;
      }
      points.push({ xValue: time, yValue: count });
      time += dateUtils.oneDayMilliseconds;
    }

    return points;
  }

  getDataForChart({ id, type, options }) {
    const optionsKeys = Object.keys(options);
    return optionsKeys.map(key => options[key]);
  }

  getDatesRange(data) {
    const dates = data.map(d => d.name);
    let range = dateUtils.getDateLimits(dates);
    range = dateUtils.addDaysMarinToRange(range, 1);
    range = dateUtils.setMinTotalDaysToRange(range, 7);
    return range;
  }

  handleBrush({ left: startDate, right: endDate }) {
    const { id, type } = this.props.questionFilter;
    this.props.toggleFilter(id, type, [startDate, endDate]);
  }

  handleClearBrush() {
    const { id, type } = this.props.questionFilter;
    this.props.toggleFilter(id, type, null);
  }

  getDateFromTimeRange(timerange, index) {
    const range = timerange._range._tail.array;
    return range[index].getTime();
  }

  render() {
    const { points: data } = this.state;

    return (
      <div style={{ textAlign: "left", backgroundColor: "#F6F8FA" }}>
        <RangeChart
          data={data}
          xScale={scaleTime()}
          handleBrush={this.handleBrush}
          handleClearBrush={this.handleClearBrush}
        />
      </div>
    );
  }
}

export default DateRangeChart;
