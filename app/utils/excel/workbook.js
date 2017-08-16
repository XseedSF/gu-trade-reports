import ExcelBuilder from "./excelBuilder";

class Workbook {
  constructor() {
    this.sheetNames = [];
    this.sheets = {};
  }

  addWorksheet(name, worksheet) {
    this.sheetNames.push(name);
    this.sheets[name] = worksheet;
  }

  export(downloadName) {
    const excelBuilder = new ExcelBuilder(this);
    excelBuilder.saveAs(downloadName);
  }
}

export default Workbook;
