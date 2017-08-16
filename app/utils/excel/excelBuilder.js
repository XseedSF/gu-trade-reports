import { saveAs } from "file-saver";
import XLSX from "xlsx";
import { stringToArrayBuffer } from "../../utils";

class ExcelBuilder {
  constructor(workbook) {
    this.excelFile = createExcelFile(workbook);
  }

  saveAs(downloadName) {
    saveAs(
      new Blob([stringToArrayBuffer(this.excelFile)], {
        type: "application/octet-stream"
      }),
      `${downloadName}.xlsx`
    );
  }
}

const createExcelFile = workbook => {
  const xlsxWorkbook = {
    SheetNames: workbook.sheetNames,
    Sheets: getWorkbookSheets(workbook)
  };

  return XLSX.write(xlsxWorkbook, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary"
  });
};

const getWorkbookSheets = workbook => {
  const sheets = {};
  Object.keys(workbook.sheets).map(key => {
    sheets[key] = workbook.sheets[key].getEncodedCells();
  });

  return sheets;
};

export default ExcelBuilder;
