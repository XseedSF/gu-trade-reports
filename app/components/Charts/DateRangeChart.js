import React, { Component } from "react";
import * as dateUtils from "../../utils/dates";
import { scaleTime } from "d3-scale";
import {
  ChartCanvas,
  Chart,
  axes,
  series,
  helper,
  interactive
} from "react-stockcharts";
import Brush from "./Brush";
const { XAxis, YAxis } = axes;
const { AreaSeries, LineSeries, ScatterSeries, SquareMarker } = series;
const { fitWidth } = helper;

class DateRangeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [{ date: new Date().getTime(), count: 0 }],
      yAxisCount: 0
    };

    this.handleBrush = this.handleBrush.bind(this);
    this.handleClearBrush = this.handleClearBrush.bind(this);
  }

  componentDidMount() {
    this.setChartData();
  }

  setChartData() {
    const points = this.getPoints();
    const yAxisCount = this.getMaxCountFromPoints(points);
    this.setState({ ...this.state, points, yAxisCount });
  }

  getMaxCountFromPoints(points) {
    const counts = points.map(p => p.count);
    return Math.max(...counts);
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
      points.push({ date: time, count });
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
    const dataForMarkers = data.map(d => d.count > 0);
    return (
      <div style={{ textAlign: "left", backgroundColor: "#F6F8FA" }}>
        <ChartCanvas
          zoomEvent={false}
          width={800}
          height={200}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          seriesName="MSFT"
          data={data}
          type="svg"
          xAccessor={d => (d ? d.date : undefined)}
          xScale={scaleTime()}
          ratio={1}
          drawMode={true}
        >
          <Chart id={0} yExtents={d => d.count}>
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={6}
              zoomEnabled={false}
            />
            <YAxis
              axisAt="left"
              orient="left"
              ticks={this.state.yAxisCount}
              tickFormat={y => `${Math.floor(y)}`}
            />
            <AreaSeries yAccessor={d => d.count} />
            <ScatterSeries
              yAccessor={d => d.count}
              marker={SquareMarker}
              markerProps={{ width: 6, stroke: "#3F71B7", fill: "#9FBED8" }}
            />/>
            <Brush
              onBrush={this.handleBrush}
              onClear={this.handleClearBrush}
              height={160}
              fill="#E1E4E6"
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

export default fitWidth(DateRangeChart);
