import React from "react";
import PropTypes from "prop-types";
import { compose, setPropTypes } from "recompose";
import { FiltersContainer } from "../containers";
import withSpinnerWhileLoading from "../hocs/withSpinnerWhileLoading";
import Filter from "./Filter";
import { RaisedButton } from "material-ui";
import { COLORS } from "../constants";

const Filters = ({
  questionsFilters,
  toggleFilter,
  clearFilters,
  isFiltered
}) =>
  <div>
    <div id="clear-filters-button">
      <RaisedButton
        label={`Limpiar filtros`}
        labelColor="#FFFFFF"
        backgroundColor={COLORS.PRIMARY}
        onClick={clearFilters}
        disabled={!isFiltered}
      />
    </div>
    <div className="question-charts-container">
      {questionsFilters.map(questionFilter =>
        <Filter
          key={`filter-${questionFilter.id}`}
          questionFilter={questionFilter}
          toggleFilter={toggleFilter}
        />
      )}
    </div>
  </div>;

const enhance = compose(
  FiltersContainer,
  withSpinnerWhileLoading,
  setPropTypes({
    questionsFilters: PropTypes.array.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired
  })
);

export default enhance(Filters);
