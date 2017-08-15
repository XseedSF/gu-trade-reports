import React from "react";
import ReactTable from "react-table";
import FlatButton from "material-ui/FlatButton";
import { exportExcel } from "../utils/index";

const Table = ({ columns, data }) => {
  return (
    <div>
      <FlatButton
        label="Exportar tabla"
        onClick={() => {
          const data = [
            [1, 2, 3, 4],
            ["Sample", "Sample", "Sample", "Sample"],
            ["foo", "bar", "Hello", "0.3"],
            ["baz", null, "qux"]
          ];
          const exportOptions = {
            cells: data,
            sheetName: "Reporte",
            downloadName: "Reporte"
          };
          exportExcel(exportOptions);
        }}
      />
      <ReactTable
        id="table-export"
        columns={columns}
        data={data}
        minRows={null}
        previousText={"Anterior"}
        nextText={"Siguiente"}
        loadingText={"Cargando..."}
        noDataText={"No hay datos"}
        pageText={"Página"}
        ofText={"de"}
        rowsText={"filas"}
      />
    </div>
  );
};

export default Table;
