import React from "react";
import {
  Resizable,
  ChartContainer,
  ChartRow,
  Charts,
  Brush,
  YAxis,
  AreaChart,
  LineChart
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

const data = require("./dataSet.js"); //require("./bike.js");

const altitudePoints = [];
for (let i = 0; i < data.time.length; i += 1) {
  if (i > 0) {
    const time = data.time[i];
    const altitude = data.altitude[i];
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
    const initialRange = null; //new TimeRange([75 * 60 * 1000, 125 * 60 * 1000]);
    this.state = {
      mode: "channels",
      rollup: "1m",
      tracker: null,
      timerange: initialRange,
      brushrange: initialRange
    };

    this.handleTrackerChanged = this.handleTrackerChanged.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }
  handleTrackerChanged(t) {
    this.setState({ tracker: t });
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
              style={{ fill: "#77e677" }}
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
              {
                <AreaChart
                  axis="axis1"
                  columns={{ up: ["altitude"], down: [] }}
                  series={altitude}
                />
              }
              {
                //<LineChart
                //  axis="axis1"
                //  series={altitude}
                //  columns={["altitude"]}
                //  breakLine={true}
                ///>
              }
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

export default TestDateSelector;
