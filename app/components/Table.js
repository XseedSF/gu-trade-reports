import React from "react";
import ReactTable from "react-table";

const Table = ({ columns, data }) => {
  return (
    <ReactTable
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
  );
};

export default Table;
