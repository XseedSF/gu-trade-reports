var config = require("config");
const guTradeApiConfig = config.get("guTradeServiceApi");
const httpRequest = require("./httpRequest");
const jwt = require("jsonwebtoken");

class BaseApi {
  constructor(envCode) {
    this.envCode = envCode;
  }

  getUserToken() {
    return jwt.sign(
      {
        username: guTradeApiConfig.username,
        password: guTradeApiConfig.password,
        envCode: this.envCode
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

    return httpRequest.get(request).then(({ data: response }) => {
      const sessionToken = response.Data;
      return sessionToken;
    });
  }
}

module.exports = BaseApi;
