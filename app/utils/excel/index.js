import Workbook from "./workbook";
import Worksheet from "./worksheet";

const exportExcel = ({ cells, downloadName, sheetName }) => {
  const worksheet = new Worksheet();
  worksheet.setCells(cells);

  const workbook = new Workbook();
  const worksheetName = sheetName;
  workbook.addWorksheet(worksheetName, worksheet);

  workbook.export(downloadName);
};

export default exportExcel;
