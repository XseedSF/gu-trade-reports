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
import moment from "moment";

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

const data = require("../TestDateSelector/dataSet.js");

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
    const initialRange = null;
    this.state = {
      mode: "channels",
      rollup: "1m",
      tracker: null,
      timerange: initialRange,
      brushrange: initialRange
    };

    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
  }

  handleTimeRangeChange(timerange) {
    if (timerange) {
      const { id, type } = this.props.questionFilter;
      const startDate = this.getDateFromTimeRange(timerange, 0);
      const endDate = this.getDateFromTimeRange(timerange, 1);
      this.props.toggleFilter(id, type, [startDate, endDate]);

      this.setState({ timerange, brushrange: timerange });
    } else {
      const { id, type } = this.props.questionFilter;
      this.props.toggleFilter(id, type, null);
      this.setState({ timerange: altitude.range(), brushrange: null });
    }
  }
  getDateFromTimeRange(timerange, index) {
    const range = timerange._range._tail.array;
    return moment(range[index]).format("DD/MM/YYYY");
  }
  render() {
    return (
      <ChartContainer timeRange={altitude.range()} format="relative">
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
    );
  }
}

export default enhance(DateRangeChart);
