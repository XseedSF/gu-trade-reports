import XLSX from "xlsx";
import Cell from "./cell";

const MAX_RANGE = 10000000;

class Worksheet {
  constructor() {
    this.cells = [];
    this.range = { s: { c: MAX_RANGE, r: MAX_RANGE }, e: { c: 0, r: 0 } };
  }

  setCellValue(row, column, value) {
    const cell = new Cell(row, column);
    if (value) {
      cell.setValue(value);
      this.cells.push(cell);
    }

    this._updateRange(row, column);
  }

  getEncodedCells() {
    const xlsxCells = {};
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];

      const xslxCell = this._cellToXslsFormat(cell);
      const cellRef = this._getCellRef(cell);
      xlsxCells[cellRef] = xslxCell;
    }

    xlsxCells["!ref"] = this._encodedRange();
    debugger;
    return xlsxCells;
  }

  _getCellRef(cell) {
    return XLSX.utils.encode_cell({ c: cell.column, r: cell.row });
  }

  _cellToXslsFormat(cell) {
    return {
      v: cell.value,
      t: cell.type,
      z: cell.numberFormat
    };
  }

  _encodedRange() {
    return this.range.s.c < MAX_RANGE
      ? XLSX.utils.encode_range(this.range)
      : null;
  }

  _updateRange(row, column) {
    if (this.range.s.r > row) this.range.s.r = row;
    if (this.range.s.c > column) this.range.s.c = column;
    if (this.range.e.r < row) this.range.e.r = row;
    if (this.range.e.c < column) this.range.e.c = column;
  }
}

export default Worksheet;
