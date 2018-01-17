import React from "react";
import FlatButton from "material-ui/FlatButton";
import FileDownload from "material-ui/svg-icons/file/file-download";
import { questionTypes } from "../constants";
import { COLORS } from "../constants";
import { Workbook, getFormattedDate } from "../utils";

const TableExport = ({ columns, data }) => {
  return (
    <div>
      <FlatButton
        label="Descargar tabla"
        style={{ color: COLORS.SECONDARY_TEXT }}
        onClick={() => {
          exportTableToExcel(columns, data);
        }}
        icon={<FileDownload />}
      />
    </div>
  );
};

const exportTableToExcel = (columns, data) => {
  const workbook = new Workbook();

  const worksheetName = "Reporte";
  const headers = columns.map(column => column.Header);
  const keys = columns.map(column => column.accessor);

  const rows = data.map(() => ({}));
  for (let i = 0; i < data.length; i++) {
    var dataValue = data[i];
    const firstKey = keys[0];
    rows[i][firstKey] = dataValue[firstKey];

    for (let j = 1; j < keys.length; j++) {
      const key = keys[j];
      rows[i][key] = getAnswerResponse(dataValue[j - 1][j - 1].answer);
    }
  }

  workbook.addWorksheet(worksheetName, headers, keys, rows);

  const downloadName = "Reporte";
  workbook.export(downloadName);
};

const getAnswerResponse = answer => {
  switch (answer.Type) {
    case questionTypes.MULTIPLE_OPTION:
      return answer.SelectedOptionName;
    case questionTypes.YES_NO:
    case questionTypes.CHECKBOX:
      return answer.YesNoValue ? "Sí" : "No";
    case questionTypes.FREE_TEXT:
    case questionTypes.BAR_CODE:
    case questionTypes.NUMERIC:
      return answer.FreeText;
    case questionTypes.CAMERA:
      // TODO: add image to the exported excel
      // return answer.ImageBase64 ? answer.ImageBase64 : "Sin imagen";
      return answer.ImageName ? "Con imagen" : "";
    case questionTypes.DATE:
      const date = new Date(answer.value);
      return getFormattedDate(date);
    default:
      return null;
  }
};

export default TableExport;
