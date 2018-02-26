const config = require("config");
const guTradeApiConfig = config.get("guTradeServiceApi");
const apiUrls = guTradeApiConfig.get("urls");
const jwt = require("jsonwebtoken");

class BaseApi {
  constructor(clientCode, serverDomain) {
    this.clientCode = clientCode;
    var baseUrl = this.getApiBaseUrl(serverDomain);
    this.httpRequest = require("./httpRequest")(baseUrl);
  }

  getApiBaseUrl(serverDomain) {
    switch (serverDomain) {
      case "cr":
        return apiUrls.cr;
      case "co":
      case "ec":
      case "pe":
      case "pa":
        return apiUrls.co;
      case "py":
      default:
        return apiUrls.uy;
      // return `http://localhost:26468/api`;
    }
  }

  getUserToken() {
    return jwt.sign(
      {
        username: guTradeApiConfig.username,
        password: guTradeApiConfig.password,
        clientCode: this.clientCode
      },
      guTradeApiConfig.publicKey,
      { expiresIn: "1h" }
    );
  }

  login() {
    const userToken = this.getUserToken();
    const request = {
      action: "user/login",
      data: {
        userToken
      }
    };

    return this.httpRequest.get(request).then(({ data: response }) => {
      const sessionToken = response.Data;
      return sessionToken;
    });
  }
}

module.exports = BaseApi;
