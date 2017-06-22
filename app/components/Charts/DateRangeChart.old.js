import React from "react";
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
import * as dateUtils from "../../utils/dates";

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

  componentDidMount() {
    this.setChartData();
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

    const points = [];
    let time = datesRange.min;
    while (time <= datesRange.max) {
      let altitude = 0;
      const completedDate = data.find(d => d.name === time);
      if (completedDate) {
        altitude = completedDate.value;
      }
      points.push([time, altitude]);
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
    return range[index].getTime();
  }

  render() {
    return (
      <ChartContainer timeRange={this.state.altitude.range()}>
        <ChartRow height="100" debug={false}>
          <Brush
            timeRange={this.state.brushrange}
            allowSelectionClear
            onTimeRangeChanged={this.handleTimeRangeChange}
            style={{ fill: "#77e677" }}
          />
          <YAxis
            id="axis1"
            label="Nº Completados"
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
