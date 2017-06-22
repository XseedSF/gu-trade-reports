import React, { Component } from "react";
import PropTypes from "prop-types";
import { GenericChartComponent, utils } from "react-stockcharts";
const { isDefined, noop, functor } = utils;

class Brush extends Component {
  constructor(props) {
    super(props);
    this.handleStartAndEnd = this.handleStartAndEnd.bind(this);
    this.handleDrawBrush = this.handleDrawBrush.bind(this);
    this.state = {
      startedBrush: false,
      completedBrush: false
    };
  }

  terminate() {
    this.setState({
      startItem: null,
      rect: null,
      startedBrush: false,
      completedBrush: false
    });
  }

  handleDrawBrush() {
    const { startItem, startedBrush, completedBrush } = this.state;

    if (startedBrush && !completedBrush) {
      const { currentItem } = this.refs.component.getMoreProps();
      const x1 = this.getBrushXFromItem(startItem);
      const x2 = this.getBrushXFromItem(currentItem);

      const width = Math.abs(x2 - x1);
      const height = this.props.height;

      this.setState({
        rect: {
          x: Math.min(x1, x2),
          y: 0,
          width,
          height
        }
      });
    }
  }

  getBrushXFromItem(item) {
    const moreProps = this.refs.component.getMoreProps();
    const { xScale, xAccessor, plotData, chartConfig } = moreProps;

    const xPrecision = chartConfig.width / plotData.length;
    const x = xScale(xAccessor(item)) - xPrecision / 2;

    if (x < 0) {
      return x + xPrecision;
    }
    return x;
  }

  handleStartAndEnd(e) {
    const moreProps = this.refs.component.getMoreProps();
    const { currentItem, displayXAccessor } = moreProps;
    const xValue = displayXAccessor(currentItem);

    const { startedBrush, completedBrush } = this.state;
    if (completedBrush) {
      // refresh
      this.terminate();
      this.props.onClear();
    } else if (startedBrush) {
      // complete brush
      this.completeBrush();
    } else {
      // start brush
      this.setState({
        startItem: currentItem,
        startedBrush: true,
        completedBrush: false
      });
    }
  }

  completeBrush() {
    const moreProps = this.refs.component.getMoreProps();
    const { currentItem, displayXAccessor } = moreProps;
    const xValue = displayXAccessor(currentItem);

    const startX = displayXAccessor(this.state.startItem);
    const left = Math.min(startX, xValue);
    const right = Math.max(startX, xValue);
    if (left != right) {
      this.props.onBrush({ left, right });
    }

    this.setState({
      ...this.state,
      startedBrush: false,
      completedBrush: true
    });
  }

  render() {
    const { rect } = this.state;
    const { fill, stroke, opacity } = this.props;
    const rectProps = { fill, stroke, opacity };

    return (
      <g>
        {isDefined(rect) ? <rect {...rect} {...rectProps} /> : null}
        <GenericChartComponent
          ref="component"
          svgDraw={this.renderSVG}
          isHover={functor(true)}
          onMouseDown={this.handleStartAndEnd}
          onMouseMove={this.handleDrawBrush}
          drawOnMouseExitOfCanvas
        />
      </g>
    );
  }
}

Brush.propTypes = {
  onBrush: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  opacity: PropTypes.number,
  interactiveState: PropTypes.object
};

Brush.defaultProps = {
  stroke: "#000000",
  opacity: 0.3,
  fill: "#3h3h3h",
  onBrush: noop,
  onStart: noop
};

export default Brush;
