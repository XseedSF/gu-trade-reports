import React from "react";
import FlatButton from "material-ui/FlatButton";
import { exportExcel } from "../utils/index";
import { questionTypes } from "../constants";
import { COLORS } from "../constants";

const TableExport = ({ columns, data }) => {
  return (
    <div>
      <FlatButton
        label="Descargar tabla"
        style={{ color: COLORS.SECONDARY_TEXT }}
        onClick={() => {
          const cells = makeCells(columns, data);
          const exportOptions = {
            cells,
            sheetName: "Reporte",
            downloadName: "Reporte"
          };
          exportExcel(exportOptions);
        }}
      />
    </div>
  );
};

const makeCells = (columns, data) => {
  const cells = [];
  const headers = columns.map(c => c.Header);
  cells.push(headers);

  const count = columns.length - 1;
  for (let i = 0; i < data.length; i++) {
    const newRow = [];
    const rowData = data[i];

    const name = rowData.name;
    newRow.push(name);
    for (let j = 0; j < count; j++) {
      const answer = rowData[j][j].answer;
      const response = getAnswerResponse(answer);
      newRow.push(response);
    }

    cells.push(newRow);
  }

  return cells;
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
      return answer.ImageBase64 ? "Con imagen" : "Sin imagen";
    case questionTypes.DATE:
      return answer.value;
    default:
      return null;
  }
};

export default TableExport;
