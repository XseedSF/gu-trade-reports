import React from "react";
import { AppBar } from "material-ui";
import { COLORS } from "../constants";
import ExportFilters from "./ExportFilters";

const Title = ({ text }) =>
  <AppBar
    style={{ backgroundColor: COLORS.PRIMARY }}
    title={text}
    iconElementLeft={<ExportFilters />}
    showMenuIconButton={true}
  />;

export default Title;
