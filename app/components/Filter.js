import React from "react";
import PropTypes from "prop-types";
import {
  CustomBarChart,
  CustomPieChart,
  DateRangeChart,
  NumericRangeChart
} from "./Charts";
import { filterTypes } from "../constants";
import { Card, CardHeader, CardMedia, CardActions } from "material-ui";
import ExportAsImage from "./ExportAsImage";
import { COLORS } from "../constants";
import { truncateText } from "../utils";

const Filter = ({ questionFilter, toggleFilter }) => {
  let filterChart = null;
  let canDisplayChart = true;
  switch (questionFilter.type) {
    case filterTypes.MULTI_SELECT:
      filterChart = (
        <CustomBarChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.SINGLE_SELECT:
      filterChart = (
        <CustomPieChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.DATE_RANGE_SELECT:
      filterChart = (
        <DateRangeChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.NUMERIC_RANGE_SELECT:
      canDisplayChart = !NumericRangeChart.isDataTooLargeForRangeChart(
        questionFilter
      );
      filterChart = canDisplayChart ? (
        <NumericRangeChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      ) : (
        <span>
          No se pudieron graficar estos datos numéricos: Las distancias entre
          los datos numéricos es muy grande.
        </span>
      );
      break;
  }

  const filterActionsId = `filter-export-button`;
  const filterElementId = `filter-export-${questionFilter.id}`;

  return (
    <div
      className="filter-card"
      style={{
        width:
          !canDisplayChart || questionFilter.type === filterTypes.SINGLE_SELECT
            ? 300
            : 615
      }}
    >
      <Card id={filterElementId}>
        <CardHeader
          title={`${truncateText(questionFilter.text, 100)}`}
          textStyle={{ paddingRight: 0 }}
          style={{ height: 74 }}
        />
        <CardMedia
          overlayContentStyle={{ alignContent: "center" }}
          style={{
            minHeight: 300,
            padding: canDisplayChart ? "0" : "0 30px"
          }}
        >
          {filterChart}
        </CardMedia>
        <CardActions id={filterActionsId}>
          <ExportAsImage
            elementId={filterElementId}
            color={COLORS.SECONDARY_TEXT}
            size={12}
            elementIdsToExclude={[filterActionsId]}
          />
        </CardActions>
      </Card>
    </div>
  );
};

Filter.propTypes = {
  questionFilter: PropTypes.object.isRequired,
  toggleFilter: PropTypes.func.isRequired
};

export default Filter;
