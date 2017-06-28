import React from "react";
import PropTypes from "prop-types";
import { compose, setPropTypes } from "recompose";
import { FiltersContainer } from "../containers";
import withSpinnerWhileLoading from "../hocs/withSpinnerWhileLoading";
import Filter from "./Filter";
import { RaisedButton } from "material-ui";
import { COLORS } from "../constants";

const Filters = ({ questionsFilters, toggleFilter, clearFilters }) =>
  <div>
    <RaisedButton
      label={`Limpiar filtros`}
      labelColor="#FFFFFF"
      backgroundColor={COLORS.PRIMARY}
      onClick={clearFilters}
    />
    <div className="question-charts-container">
      {questionsFilters.map(f =>
        <Filter
          key={`filter-${f.id}`}
          questionFilter={f}
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
