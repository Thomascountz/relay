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
      // noop
    });
};

const construct_uri = text => {
  return encodeURI(SENTIMENT_ANALYSIS_ENDPOINT + "?text=" + text);
};

module.exports = {
  SENTIMENT_ANALYSIS_ENDPOINT: SENTIMENT_ANALYSIS_ENDPOINT,
  analyze: analyze
};
