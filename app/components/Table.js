import React from "react";
import ReactTable from "react-table";

const Table = ({ columns, data }) => {
  return (
    <div>
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
				pageSize={10}
				showPageSizeOptions={false}
      />
    </div>
  );
};

export default Table;
