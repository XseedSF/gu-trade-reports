import React from "react";
import { DateRange } from "react-date-range";
import ranges from "./PredefinedDateRanges";
import { compose, withHandlers } from "recompose";
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

const DateRangeChart = ({ questionFilter, toggleFilter, onChange }) => {
  const { id, type, options } = questionFilter;
  console.log(id, type, options);
  return (
    <DateRange
      lang="es"
      ranges={ranges}
      onChange={onChange}
      twoStepChange={true}
			startDate={null}
    />
  );
};

export default enhance(DateRangeChart);
