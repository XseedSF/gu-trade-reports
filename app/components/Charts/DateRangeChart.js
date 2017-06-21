import React from "react";
import { compose, withHandlers } from "recompose";
import { TimeSeries } from "pondjs";
import {
  Resizable,
  ChartContainer,
  ChartRow,
  Charts,
  Brush,
  YAxis,
  AreaChart
} from "react-timeseries-charts";

class DateRangeChart extends React.Component {
  constructor(props) {
    super(props);
    const initialRange = null;
    this.state = {
      timerange: initialRange,
      brushrange: initialRange,
      altitude: new TimeSeries({
        name: "Altitude",
        columns: ["time", "altitude"],
        points: [[0, 0]]
      })
    };

    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }

  getDataForChart({ id, type, options }) {
    const optionsKeys = Object.keys(options);
    return optionsKeys.map(key => options[key]);
  }
  getDatesRange(data) {
    const dates = data.map(d => d.name);
    const max = Math.max(...dates);
    const min = Math.min(...dates);
    return { max, min };
  }
  setChartData() {
    const points = this.getAltitudePoints();

    const altitude = new TimeSeries({
      name: "Altitude",
      columns: ["time", "altitude"],
      points
    });

    this.setState({ ...this.state, altitude });
  }
  getAltitudePoints() {
    const data = this.getDataForChart(this.props.questionFilter);
    const datesRange = this.getDatesRange(data);
    const oneDay = 24 * 60 * 60 * 1000;

    const points = [];
    let time = datesRange.min;
    while (time <= datesRange.max) {
      let altitude = 0;
      const completedDate = data.find(d => d.name === time);
      if (completedDate) {
        altitude = completedDate.value;
      }
      points.push([time, altitude]);
      time += oneDay;
    }

    return points;
  }
  componentDidMount() {
    this.setChartData();
  }

  handleTimeRangeChange(timerange) {
    const { id, type } = this.props.questionFilter;

    if (timerange) {
      const startDate = this.getDateFromTimeRange(timerange, 0);
      const endDate = this.getDateFromTimeRange(timerange, 1);
      this.props.toggleFilter(id, type, [startDate, endDate]);

      this.setState({ timerange, brushrange: timerange });
    } else {
      this.props.toggleFilter(id, type, null);
      this.setState({
        timerange: this.state.altitude.range(),
        brushrange: null
      });
    }
  }
  getDateFromTimeRange(timerange, index) {
    const range = timerange._range._tail.array;
    return range[index].valueOf();
  }
  render() {
    return (
      <ChartContainer timeRange={this.state.altitude.range()} format="relative">
        <ChartRow height="100" debug={false}>
          <Brush
            timeRange={this.state.brushrange}
            allowSelectionClear
            onTimeRangeChanged={this.handleTimeRangeChange}
            style={{ fill: "#77e677" }}
          />
          <YAxis
            id="axis1"
            label="Nº completados"
            min={0}
            max={this.state.altitude.max("altitude")}
            width={70}
            type="linear"
            format="d"
          />
          <Charts>
            {
              <AreaChart
                axis="axis1"
                columns={{ up: ["altitude"], down: [] }}
                series={this.state.altitude}
              />
            }
          </Charts>
        </ChartRow>
      </ChartContainer>
    );
  }
}

export default DateRangeChart;
