import TYPE from "./cellType";
import { dateFormat } from "./excelBuilder";

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.value = null;
    this.type = null;
    this.numberFormat = null;
    this.style = {};
  }

  setValue(value, isHeader) {
    this.value = value;
    this._setValueType(isHeader);
  }

  _setValueType(isHeader) {
    if (isHeader) {
      this.type = TYPE.STRING;
      this.style = {
        alignment: {
          wrapText: true,
          horizontal: "center",
          vertical: "center"
        },
        font: { bold: true }
      };
    } else {
      if (typeof this.value === "number") {
        this.type = TYPE.NUMBER;
        this.style = {
          alignment: {
            wrapText: true,
            horizontal: "right",
            vertical: "center"
          }
        };
      } else if (typeof this.value === "boolean") {
        this.type = TYPE.STRING;
        this.value = this.value ? "Si" : "No";
        this.style = {
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "center"
          }
        };
      } else if (this.value instanceof Date) {
        this.type = TYPE.NUMBER;
        this.numberFormat = dateFormat;
        this.value = datenum(this.value);
        this.style = {
          alignment: {
            wrapText: true,
            horizontal: "center",
            vertical: "center"
          }
        };
      } else {
        this.type = TYPE.STRING;
        this.style = {
          alignment: {
            wrapText: true,
            horizontal: "left",
            vertical: "center"
          }
        };
      }
    }
  }
}

const datenum = (value, date1904) => {
  if (date1904) value += 1462;
  var epoch = Date.parse(value);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
};

export default Cell;
