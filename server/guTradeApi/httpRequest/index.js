module.exports = function(baseUrl) {
  const axios = require("axios");

  const setAuthentication = function(token) {
    axios.defaults.headers.common["Authentication"] = token;
  };

  const http = function() {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      }
    });
  };

  const get = function({ action, data, authentication }) {
    const queryParams = objectToQueryParams(data);
    return http().get(`/${action}${queryParams}`);
  };

  const objectToQueryParams = function(object) {
    let result = "";
    let isFirstProperty = true;
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (isFirstProperty) {
          isFirstProperty = false;
          result += "?";
        } else {
          result += "&";
        }
        result += property + "=" + object[property];
      }
    }

    return result;
  };

  return {
    get,
    setAuthentication
  };
};
