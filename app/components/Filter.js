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

const Filter = ({ questionFilter, toggleFilter }) => {
  let specificFilter = null;
  switch (questionFilter.type) {
    case filterTypes.MULTI_SELECT:
      specificFilter = (
        <CustomBarChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.SINGLE_SELECT:
      specificFilter = (
        <CustomPieChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.DATE_RANGE_SELECT:
      specificFilter = (
        <DateRangeChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
    case filterTypes.NUMERIC_RANGE_SELECT:
      specificFilter = (
        <NumericRangeChart
          key={questionFilter.id}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      );
      break;
  }

  const filterActionsId = `filter-export-button`;
  const filterElementId = `filter-export-${questionFilter.id}`;
  return (
    <div className="filter-card" style={{ maxWidth: 630 }}>
      <Card id={filterElementId}>
        <CardHeader title={`${questionFilter.text}`} />
        <CardMedia
          overlayContentStyle={{ alignContent: "center" }}
          style={{ minHeight: 300 }}
        >
          {specificFilter}
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
