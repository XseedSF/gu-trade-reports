import React from "react";
import { AppBar } from "material-ui";
import { COLORS } from "../constants";
import ExportAsImage from "./ExportAsImage";

const Title = ({ text }) => (
  <AppBar
    style={{ backgroundColor: COLORS.PRIMARY }}
    title={text}
    iconElementLeft={
      <ExportAsImage color="#FFFFFF" elementId="filters-export" />
    }
    showMenuIconButton={false}
  />
);

export default Title;
