const axios = require("axios");

const SENTIMENT_ANALYSIS_ENDPOINT =
  "https://relay-service.herokuapp.com/sentiment/analyze";

const analyze = text => {
  return axios
    .post(SENTIMENT_ANALYSIS_ENDPOINT, build_body(text))
    .then(result => {
      return result.data;
    })
    .catch(error => {
      // noop
    });
};

const build_body = text => {
  return { text: text };
};

module.exports = {
  SENTIMENT_ANALYSIS_ENDPOINT: SENTIMENT_ANALYSIS_ENDPOINT,
  analyze: analyze
};
