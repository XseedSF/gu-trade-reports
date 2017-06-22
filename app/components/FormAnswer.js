import React from "react";
import ImageAnswer from "./ImageAnswer";
import DateText from "./DateText";
import { questionTypes } from "../constants";

const FormAnswer = ({ answer, name }) => {
  const renderReponse = answer => {
    switch (answer.Type) {
      case questionTypes.MULTIPLE_OPTION:
        return <span>{answer.SelectedOptionName}</span>;
      case questionTypes.YES_NO:
        return <span>{answer.YesNoValue ? "Sí" : "No"}</span>;
      case questionTypes.FREE_TEXT:
        return <span> {answer.FreeText} </span>;
      case questionTypes.CAMERA:
        return answer.ImageBase64
          ? <ImageAnswer image={answer.ImageBase64} title={name} />
          : <span> Sin imagen </span>;
      case questionTypes.DATE:
        return <span>{<DateText value={answer.value} />}</span>;
      case questionTypes.CHECKBOX:
        return answer.value
          ? <input type="checkbox" disabled="disabled" checked />
          : <input type="checkbox" disabled="disabled" />;
      default:
        return <span> </span>;
    }
  };

  return renderReponse(answer);
};

export default FormAnswer;
