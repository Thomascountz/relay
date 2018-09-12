const axios = require("axios");
const nativeUI = require("./nativeUI");

const SENTIMENT_ANALYSIS_ENDPOINT =
  "https://frozen-hollows-25947.herokuapp.com/sentiment/analyze";

const analyze = text => {
  return axios
    .get(construct_uri(text))
    .then(result => {
      return result.data;
    })
    .catch(error => {
      // return logAxiosError(error);
    });
};

const construct_uri = text => {
  return encodeURI(SENTIMENT_ANALYSIS_ENDPOINT + "?text=" + text);
};

// const logAxiosError = error => {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     // that falls out of the range of 2xx
//     nativeUI.displayErrorMessage("API Error", error.response);
//   } else if (error.request) {
//     // The request was made but no response was received
//     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//     // http.ClientRequest in node.js
//     nativeUI.displayErrorMessage("Request Error", error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     nativeUI.displayErrorMessage("Client Error", error.message);
//   }
// };

module.exports = {
  SENTIMENT_ANALYSIS_ENDPOINT: SENTIMENT_ANALYSIS_ENDPOINT,
  analyze: analyze
};
