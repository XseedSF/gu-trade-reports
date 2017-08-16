import Cell from "./cell";

class Worksheet {
  constructor() {
    this.cells = [];
  }

  setCellValue(row, column, value) {
    const cell = new Cell(row, column);
    if (value) {
      cell.setValue(value);
      this.cells.push(cell);
    }
  }
}

export default Worksheet;
