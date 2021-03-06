import React, { Component } from "react";
import { ChartCanvas, Chart, axes, series } from "react-stockcharts";
import Brush from "./Brush";
import Marker from "./Marker";
const { XAxis, YAxis } = axes;
const { AreaSeries, LineSeries, ScatterSeries } = series;

const getMaxYValue = data => {
  const yValues = data.map(p => p.yValue);
  return Math.max(...yValues);
};

const getTicksForYAxis = data => {
  const yAxisMax = getMaxYValue(data);
  const maxTicks = 6;
  return Math.min(yAxisMax, maxTicks);
};

const RangeChart = ({
  data,
  xScale,
  handleBrush,
  handleClearBrush,
  xTickFormat,
  brushRange,
  fill
}) => {
  if (!data || data.length <= 1) {
    return <span>No hay suficientes datos para graficar.</span>;
  }

  const yAxisTicks = getTicksForYAxis(data);
  const chartWidth = 595;
	const chartHeight = 220;
	const brushHeight = chartHeight - 40;
  const yGrid = {
    innerTickSize: -1 * chartWidth,
    tickStrokeDasharray: "Solid",
    tickStrokeOpacity: 0.2,
    tickStrokeWidth: 1
  };
  return (
    <div style={{ textAlign: "left", marginRight: 20, paddingTop: 35 }}>
      <ChartCanvas
        zIndex={0}
        zoomEvent={false}
        width={chartWidth}
        height={chartHeight}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        seriesName="MSFT"
        data={data}
        type="svg"
        xAccessor={d => (d ? d.xValue : undefined)}
        xScale={xScale}
        ratio={1}
        drawMode={true}
      >
        <Chart id={0} yExtents={d => d.yValue}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            ticks={6}
            tickFormat={xTickFormat}
            zoomEnabled={false}
          />
          <YAxis
            axisAt="left"
            orient="left"
            ticks={yAxisTicks}
            tickFormat={y => `${Math.floor(y)}`}
            zoomEnabled={false}
            {...yGrid}
          />
          <AreaSeries yAccessor={d => d.yValue} fill={fill} opacity={0.6} />
          <ScatterSeries
            yAccessor={d => d.yValue}
            marker={Marker}
            markerProps={{ width: 6, stroke: "#009688", fill: "#B2DFDB" }}
          />
          <Brush
            range={brushRange}
            onBrush={handleBrush}
            onClear={handleClearBrush}
            height={brushHeight}
            fill="#E1E4E6"
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default RangeChart;
