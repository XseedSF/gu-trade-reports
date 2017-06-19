import React from "react";
import moment from "moment";

const DateText = ({ value }) =>
  value != null ? <span>{moment(value).format("HH:mm DD/MM/YYYY")}</span> : "";

export default DateText;
