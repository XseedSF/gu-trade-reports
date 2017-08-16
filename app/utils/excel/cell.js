import TYPE from "./cellType";
import { dateFormat } from "./excelBuilder";

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.value = null;
    this.type = null;
    this.numberFormat = null;
  }

  setValue(value) {
    this.value = value;
    this._setValueType();
  }

  _setValueType() {
    if (typeof this.value === "number") {
      this.type = TYPE.NUMBER;
    } else if (typeof this.value === "boolean") {
      this.type = TYPE.BOOL;
    } else if (this.value instanceof Date) {
      this.type = TYPE.NUMBER;
      this.numberFormat = dateFormat;
      this.value = datenum(this.value);
    } else {
      this.type = TYPE.STRING;
    }
  }
}

const datenum = (value, date1904) => {
  if (date1904) value += 1462;
  var epoch = Date.parse(value);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

export default Cell;
