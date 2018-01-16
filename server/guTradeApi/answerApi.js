const BaseApi = require("./baseApi.js");
const questionTypes = require("../constants").questionTypes;

class AnswerApi extends BaseApi {
  constructor(clientCode, hostname) {
    super(clientCode, hostname);
  }

  getImage(answerId, success, error) {
    this.login()
      .then(sessionToken => {
        this.httpRequest.setAuthentication(sessionToken);

        const request = {
          action: "answer/GetImage",
          data: {
            answerId
          }
        };
        this.httpRequest
          .get(request)
          .then(({ data: response }) => {
            success(response.Data);
          })
          .catch(error);
      })
      .catch(error);
  }
}

module.exports = AnswerApi;
