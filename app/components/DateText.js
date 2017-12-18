import React from "react";
import moment from "moment";

const DateText = ({ value }) =>
	value ? <span>{moment(value).format("DD/MM/YYYY")}</span> : null;

export default DateText;
