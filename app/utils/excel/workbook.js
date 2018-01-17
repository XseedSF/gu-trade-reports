import ExcelBuilder from "./excelBuilder";
import { getWorksheet } from "./Worksheet";

class Workbook {
  constructor() {
    this.sheetNames = [];
    this.sheets = {};
  }

  addWorksheet(name, headers, keys, rows) {
    this.sheetNames.push(name);
    this.sheets[name] = getWorksheet(headers, keys, rows);
  }

  export(downloadName) {
    const excelBuilder = new ExcelBuilder(this);
    excelBuilder.saveAs(downloadName);
  }
}

export default Workbook;
