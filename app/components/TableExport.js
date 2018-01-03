import React from "react";
import FlatButton from "material-ui/FlatButton";
import FileDownload from "material-ui/svg-icons/file/file-download";
import { questionTypes } from "../constants";
import { COLORS } from "../constants";
import { Workbook, Worksheet } from "../utils";

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
  const worksheetName = "Reporte";
  const worksheet = getWorksheet(columns, data);

  const workbook = new Workbook();
  workbook.addWorksheet(worksheetName, worksheet);

  const downloadName = "Reporte";
  workbook.export(downloadName);
};

const getWorksheet = (columns, data) => {
  const worksheet = new Worksheet();

  let row = 0;
  const headers = columns.map((c, index) => {
    worksheet.setCellValue(row, index, c.Header);
  });

  for (let i = 0; i < data.length; i++) {
    row++;
    const rowData = data[i];
    worksheet.setCellValue(row, 0, rowData.name);

    for (let column = 1; column < columns.length - 1; column++) {
      const { answer } = rowData[column][column];
      const response = getAnswerResponse(answer);
      worksheet.setCellValue(row, column, response);
    }
  }

  return worksheet;
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
