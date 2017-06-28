import React from "react";
import { AppBar } from "material-ui";
import { COLORS } from "../constants";

const Title = ({ text }) =>
  <AppBar
    style={{ backgroundColor: COLORS.PRIMARY }}
    title={text}
  />;

export default Title;
