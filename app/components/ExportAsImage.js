import React from "react";
import PropTypes from "prop-types";
import { FlatButton } from "material-ui";
import FileDownload from "material-ui/svg-icons/file/file-download";
import domtoimage from "dom-to-image";

const ExportAsImage = ({ elementId, color, size, elementIdsToExclude }) => {
  const filter = node => !elementIdsToExclude.includes(node.id);

  return (
    <FlatButton
      label="Descargar"
      labelStyle={{ fontSize: size }}
      style={{ color: color }}
      onClick={() => {
        exportElementAsImage(elementId, filter);
      }}
      icon={<FileDownload />}
    />
  );
};

ExportAsImage.propTypes = {
  elementId: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  elementIdsToExclude: PropTypes.array
};

ExportAsImage.defaultProps = {
  color: "#000000",
  size: 15,
  elementIdsToExclude: []
};

const exportElementAsImage = (elementId, filter) => {
  domtoimage
    .toPng(document.getElementById(elementId), {
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

export default ExportAsImage;
