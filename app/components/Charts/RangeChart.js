import React, { Component } from "react";
import { ChartCanvas, Chart, axes, series, helper } from "react-stockcharts";
import Brush from "./Brush";
const { XAxis, YAxis } = axes;
const { AreaSeries, LineSeries, ScatterSeries, SquareMarker } = series;

const getMaxYValue = data => {
  const yValues = data.map(p => p.yValue);
  return Math.max(...yValues);
};

const RangeChart = ({ data, xScale, handleBrush, handleClearBrush }) => {
  if (!data || data.length <= 1) {
    return <span>No hay suficientes datos para graficar.</span>;
  }

  const yAxisMax = getMaxYValue(data);

  const yGrid = {
    innerTickSize: -1 * 800,
    tickStrokeDasharray: "Solid",
    tickStrokeOpacity: 0.2,
    tickStrokeWidth: 1
  };
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
            zoomEnabled={false}
          />
          <YAxis
            axisAt="left"
            orient="left"
            ticks={yAxisMax}
            tickFormat={y => `${Math.floor(y)}`}
            zoomEnabled={false}
            {...yGrid}
          />
          <AreaSeries yAccessor={d => d.yValue} />
          <ScatterSeries
            yAccessor={d => d.yValue}
            marker={SquareMarker}
            markerProps={{ width: 6, stroke: "#3F71B7", fill: "#9FBED8" }}
          />/>
          <Brush
            onBrush={handleBrush}
            onClear={handleClearBrush}
            height={160}
            fill="#E1E4E6"
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default RangeChart;