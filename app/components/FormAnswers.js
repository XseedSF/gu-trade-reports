import React from "react";
import PropTypes from "prop-types";
import FormAnswer from "./FormAnswer";
import NoDataMatching from "./NoMatchingData";
import container from "../containers/FormAnswers";
import { compose, setPropTypes } from "recompose";
import withSpinnerWhileLoading from "../hocs/withSpinnerWhileLoading";
import TableExport from "./TableExport";
import Table from "./Table";
import "react-table/react-table.css";

const FormAnswers = ({ questions, completedForms }) => {
  const columns = [
    {
      Header: "Nombre del punto de venta",
      accessor: "name",
      minWidth: 200
    },
    ...questions.map((question, index) => {
      return {
        Header: question.Text,
        accessor: index.toString(),
        minWidth: 150,
        Cell: ({ value }) =>
          <FormAnswer answer={value[index].answer} name={value[index].name} />
      };
    })
  ];

  const data = [];
  for (let completedForm of completedForms) {
    const answers = completedForm.answers.map((answer, index) => {
      const attr = index.toString();
      return { [attr]: { answer, name: completedForm.name } };
    });
    data.push({
      name: completedForm.name,
      ...answers
    });
  }

  return (
    <div className="form-answers-table">
      <Table columns={columns} data={data} />
      <TableExport columns={columns} data={data} />
    </div>
  );
};

const enhance = compose(
  container,
  setPropTypes({
    questions: React.PropTypes.array,
    completedForms: React.PropTypes.array.isRequired
  }),
  withSpinnerWhileLoading
);

export default enhance(FormAnswers);
