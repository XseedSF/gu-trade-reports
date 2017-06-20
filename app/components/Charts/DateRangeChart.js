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

const enhance = compose(
  withHandlers({
    onChange: ({ questionFilter, toggleFilter }) => range => {
      const { id, type } = questionFilter;
      const startDate = range.startDate.format("DD/MM/YYYY");
      const endDate = range.endDate.format("DD/MM/YYYY");
      toggleFilter(id, type, [startDate, endDate]);
    }
  })
);

const data = require("../TestDateSelector/dataSet.js"); //require("./bike.js");

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

class DateRangeChart extends React.Component {
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
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }
}

export default enhance(DateRangeChart);
