import React from "react";
import { FlatButton } from "material-ui";
import domtoimage from "dom-to-image";

const ExportFilters = () => {
  return (
    <FlatButton
      label="Exportar"
      style={{ color: "#FFFFFF", marginTop: 8 }}
      onClick={exportFilters}
    />
  );
};

const filter = node => node.id !== "clear-filters-button";

const exportFilters = () => {
  domtoimage
    .toPng(document.getElementById("app-export"), {
      bgcolor: "#FFFFFF",
      filter
    })
    .then(function(dataUrl) {
      var link = document.createElement("a");
      link.download = "report.png";
      link.href = dataUrl;
      link.click();
    });
};

export default ExportFilters;
