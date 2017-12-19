var config = require("config");
const guTradeApiConfig = config.get("guTradeServiceApi");
const jwt = require("jsonwebtoken");

class BaseApi {
  constructor(clientCode, hostname) {
    this.clientCode = clientCode;
    var baseUrl = this.getApiBaseUrl(hostname);
    this.httpRequest = require("./httpRequest")(baseUrl);
  }

  getApiBaseUrl(hostname) {
    var domain = hostname.split(",")[0];
    switch (hostname) {
      case "cr":
        return "";
      case "co":
      case "ec":
      case "pe":
      case "pa":
        return "";
      default:
        // `http://dev.xseed.com.uy/ApiService.svc/api/`,
        return `http://localhost:26468/api/`;
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
