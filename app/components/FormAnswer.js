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
      case questionTypes.BAR_CODE:
      case questionTypes.NUMERIC:
        return <span> {answer.FreeText} </span>;
      case questionTypes.CAMERA:
        return answer.ImageName ? (
          <ImageAnswer
            answerId={answer.Id}
            image={answer.ImageBase64}
            title={name}
          />
        ) : (
          <span />
        );
      case questionTypes.DATE:
        return <span>{<DateText value={answer.value} />}</span>;
      case questionTypes.CHECKBOX:
        return <input type="checkbox" disabled checked={answer.value} />;
      default:
        return <span />;
    }
  };

  return renderReponse(answer);
};

export default FormAnswer;
