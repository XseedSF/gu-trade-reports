import React from "react";
import PropTypes from "prop-types";

const FilterTitle = ({ text }) =>
  <div className="question-title-container">
    <label className="question-title">
      Pregunta: <span className="question-title-text">{text}</span>
    </label>
  </div>;

FilterTitle.propTypes = {
  text: PropTypes.string.isRequired
};

export default FilterTitle;
