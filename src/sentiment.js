const axios = require("axios");

const SENTIMENT_ANALYSIS_ENDPOINT =
  "https://relay-service.herokuapp.com/sentiment/analyze";

const analyze = text => {
  return axios
    .get(constructURI(text))
    .then(result => {
      return result.data;
    })
    .catch(error => {
      // noop
    });
};

const constructURI = text => {
  return encodeURI(SENTIMENT_ANALYSIS_ENDPOINT + "?text=" + text);
};

module.exports = {
  SENTIMENT_ANALYSIS_ENDPOINT: SENTIMENT_ANALYSIS_ENDPOINT,
  analyze: analyze
};
