import { saveAs } from "file-saver";
import XLSX from "xlsx";
import { stringToArrayBuffer } from "../../utils";

export const dateFormat = XLSX.SSF._table[14];

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
    sheets[key] = encodeCells(workbook.sheets[key].cells);
  });

  return sheets;
};

const encodeCells = cells => {
  const xlsxCells = {};
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];

    const xslxCell = cellToXslsFormat(cell);
    const cellRef = getCellRef(cell);
    xlsxCells[cellRef] = xslxCell;
  }

  xlsxCells["!ref"] = getCellsRange(cells);
  return xlsxCells;
};

const getCellRef = cell => {
  return XLSX.utils.encode_cell({ c: cell.column, r: cell.row });
};

const cellToXslsFormat = cell => {
  return {
    v: cell.value,
    t: cell.type,
    z: cell.numberFormat
  };
};

const getCellsRange = cells => {
  const maxRange = cells.length;
  const range = { s: { c: 0, r: 0 }, e: { c: maxRange, r: maxRange } };
  return XLSX.utils.encode_range(range);
};

export default ExcelBuilder;
