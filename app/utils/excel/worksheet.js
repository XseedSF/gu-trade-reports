import Cell from "./cell";

class Worksheet {
  constructor() {
    this.cells = [];
    this.wscols = [];
  }

  setCellValue(row, column, value, isHeader) {
    const cell = new Cell(row, column);
    if (value != null && value != undefined) {
      cell.setValue(value, isHeader);
      this.cells.push(cell);
    }
  }

  setColumnSize(column, newSize) {
    if (this.wscols[column] === undefined || this.wscols[column] < newSize) {
      this.wscols[column] = newSize;
    }
  }
}

export const getWorksheet = (headers, keys, rows) => {
  const worksheet = new Worksheet();

  let rowIndex = 0;
  headers.map((header, index) => {
    worksheet.setCellValue(rowIndex, index, header, true);
    worksheet.setColumnSize(index, header.length);
  });

  for (let i = 0; i < rows.length; i++) {
    rowIndex++;
    const row = rows[i];
    for (let column = 0; column < headers.length; column++) {
      const value = row[keys[column]] || "";
      worksheet.setCellValue(rowIndex, column, value);
      worksheet.setColumnSize(column, value.length);
    }
  }

  return worksheet;
};

export default Worksheet;
