import ExcelBuilder from "./excelBuilder";

class Workbook {
  constructor() {
    this.sheetNames = [];
    this.sheets = {};
  }

  addWorksheet(name, worksheetCells) {
    this.sheetNames.push(name);
    this.sheets[name] = worksheetCells;
  }

  export(downloadName) {
    const excelBuilder = new ExcelBuilder(this);
    excelBuilder.saveAs(downloadName);
  }
}

export default Workbook;
