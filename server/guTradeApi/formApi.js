var sql = require("mssql");
const BaseApi = require("./baseApi.js");
const httpRequest = require("./httpRequest");
const questionTypes = require("../constants");

class FormApi extends BaseApi {
  constructor(envCode) {
    super(envCode);
  }

  getCompletedForms(filter, success, error) {
    this.login()
      .then(sessionToken => {
        httpRequest.setAuthentication(sessionToken);

        const formRequest = {
          action: "form/GetForm",
          data: {
            formId: filter.formId
          }
        };
        httpRequest
          .get(formRequest)
          .then(formResponse => {
            const form = getFormFromResponse(formResponse);

            const completedFormsRequest = {
              action: "form/GetCompletedForms",
              data: filter
            };
            httpRequest
              .get(completedFormsRequest)
              .then(completedFormsResponse => {
                const completedForms = getCompletedFormsFromResponse(
                  completedFormsResponse
                );

                form.completedForms = completedForms;
                success(form);
              })
              .catch(error);
          })
          .catch(error);
      })
      .catch(error);
  }
}

const getFormFromResponse = function({ data: response }) {
  const formResponse = response.Data;
  const form = {
    id: formResponse.Id,
    name: formResponse.Name,
    questions: [],
    completedForms: []
  };

  for (let i = 0; i < formResponse.Questions.length; i++) {
    const questionResponse = formResponse.Questions[i];
    question = {
      Id: questionResponse.Id,
      Type: questionResponse.Type,
      Text: questionResponse.Text,
      Required: questionResponse.Required,
      Options: []
    };

    for (let j = 0; j < questionResponse.Options.length; j++) {
      const option = questionResponse.Options[j];
      question.Options.push({
        Id: option.Id,
        Text: option.Text
      });
    }

    form.questions.push(question);
  }

  return form;
};

const getCompletedFormsFromResponse = function({ data: response }) {
  const completedFormsResponse = response.Data;
  const completedForms = [];
  let cfReponse = null,
    completedForm = null;
  for (let i = 0; i < completedFormsResponse.length; i++) {
    cfReponse = completedFormsResponse[i];
    const completedForm = {
      Id: cfReponse.Id,
      name: cfReponse.PointOfInterestName,
      pointOfInterestId: cfReponse.PointOfInterestId,
      answers: []
    };

    for (let j = 0; j < cfReponse.Answers.length; j++) {
      const cfAnswer = cfReponse.Answers[j];
      let base64Image =
        cfAnswer.ImageArray != null
          ? new Buffer(cfAnswer.ImageArray, "binary").toString("base64")
          : "";

      const isMultipleOption =
        cfAnswer.Question.Type.Code === questionTypes.MULTIPLE_OPTION;
      const answer = {
        Id: cfAnswer.Id,
        QuestionId: cfAnswer.Question.Id,
        Type: cfAnswer.Question.Type.Code,
        Text: cfAnswer.Question.Text,
        YesNoValue: cfAnswer.YesNoOption,
        FreeText: cfAnswer.FreeText,
        SelectedOptionId: isMultipleOption
          ? cfAnswer.ChosenQuestionOption.Id
          : null,
        SelectedOptionName: isMultipleOption
          ? cfAnswer.ChosenQuestionOption.Text
          : null,
        ImageBase64: base64Image,
        DateReply: cfAnswer.DateReply,
        value: getAnswerValue(cfAnswer)
      };
      completedForm.answers.push(answer);
    }

    completedForms.push(completedForm);
  }

  return completedForms;
};

const getAnswerValue = answer => {
  switch (answer.Question.Type.Code) {
    case questionTypes.CHECKBOX:
      return answer.CheckOption;
    case questionTypes.YES_NO:
      return answer.YesNoOption;
    case questionTypes.MULTIPLE_OPTION:
      return answer.ChosenQuestionOption.Id;
    case questionTypes.CAMERA:
      return !answer.Skipped && answer.ImageArray != null;
    case questionTypes.DATE:
      return !answer.Skipped && answer.DateReply != null
        ? answer.DateReply.getTime() + 3 * 60 * 60 * 1000
        : null;
    case questionTypes.NUMERIC:
      const value = parseFloat(answer.FreeText);
      return !answer.Skipped && value ? value : 0;
    case questionTypes.FREE_TEXT:
    case questionTypes.BAR_CODE:
    case questionTypes.SIGNATURE:
    case questionTypes.IMAGE:
      return !answer.Skipped;
  }
};

module.exports = FormApi;
