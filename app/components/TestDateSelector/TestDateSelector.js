import React from "react";
import {
  Resizable,
  ChartContainer,
  ChartRow,
  Charts,
  Brush,
  YAxis,
  AreaChart
} from "react-timeseries-charts";
import { TimeSeries, TimeRange, avg, filter, percentile, median } from "pondjs";

const data = require("./bike.js");

const pacePoints = [];
const speedPoints = [];
const hrPoints = [];
const altitudePoints = [];
for (let i = 0; i < data.time.length; i += 1) {
  if (i > 0) {
    const deltaTime = data.time[i] - data.time[i - 1];
    const time = data.time[i] * 1000;
    altitudePoints.push([time, altitude]);
  }
}

const altitude = new TimeSeries({
  name: "Altitude",
  columns: ["time", "altitude"],
  points: altitudePoints
});

class TestDateSelector extends React.Component {
  constructor(props) {
    super(props);
    const initialRange = new TimeRange([75 * 60 * 1000, 125 * 60 * 1000]);
    this.state = {
      mode: "channels",
      rollup: "1m",
      tracker: null,
      timerange: initialRange,
      brushrange: initialRange
    };
  }
  handleTrackerChanged(t) {
    this.setState({ tracker: t });
  }
  handleTimeRangeChange(event) {
    console.log(event);
  }
  handleTimeRangeChange(timerange) {
    if (timerange) {
      this.setState({ timerange, brushrange: timerange });
    } else {
      this.setState({ timerange: altitude.range(), brushrange: null });
    }
  }

  render() {
    return (
      <Resizable>
        <ChartContainer
          timeRange={altitude.range()}
          format="relative"
          trackerPosition={this.state.tracker}
        >
          <ChartRow height="100" debug={false}>
            <Brush
              timeRange={this.state.brushrange}
              allowSelectionClear
              onTimeRangeChanged={this.handleTimeRangeChange}
            />
            <YAxis
              id="axis1"
              label="Altitude (ft)"
              min={0}
              max={altitude.max("altitude")}
              width={70}
              type="linear"
              format="d"
            />
            <Charts>
              <AreaChart
                axis="axis1"
                columns={{ up: ["altitude"], down: [] }}
                series={altitude}
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

export default TestDateSelector;
