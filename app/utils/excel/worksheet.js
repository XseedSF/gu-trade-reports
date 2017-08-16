import XLSX from "xlsx";

const MAX_RANGE = 10000000;

class Worksheet {
  constructor() {
    this.cells = {};
    this.range = { s: { c: MAX_RANGE, r: MAX_RANGE }, e: { c: 0, r: 0 } };
  }

  setCells(data) {
    for (var row = 0; row != data.length; ++row) {
      for (var column = 0; column != data[row].length; ++column) {
        this.updateRange(row, column);

        var cell = { v: data[row][column] };
        if (cell.v) {
          setCellType(cell);
          var cellRef = XLSX.utils.encode_cell({ c: column, r: row });
          this.cells[cellRef] = cell;
        }
      }
    }

    this.encodeCellsRange();
  }

  encodeCellsRange() {
    if (this.range.s.c < MAX_RANGE) {
      this.cells["!ref"] = XLSX.utils.encode_range(this.range);
    }
  }

  updateRange(row, column) {
    if (this.range.s.r > row) this.range.s.r = row;
    if (this.range.s.c > column) this.range.s.c = column;
    if (this.range.e.r < row) this.range.e.r = row;
    if (this.range.e.c < column) this.range.e.c = column;
  }
}

const setCellType = cell => {
  if (typeof cell.v === "number") {
    cell.t = "n";
  } else if (typeof cell.v === "boolean") {
    cell.t = "b";
  } else if (cell.v instanceof Date) {
    cell.t = "n";
    cell.z = XLSX.SSF._table[14];
    cell.v = datenum(cell.v);
  } else {
    cell.t = "s";
  }
};

const datenum = (value, date1904) => {
  if (date1904) value += 1462;
  var epoch = Date.parse(value);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

export default Worksheet;
