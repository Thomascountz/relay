import sentiment from "./sentiment";

import nativeUI from "./nativeUI";
jest.mock("./nativeUI");

import axios from "axios";
jest.mock("axios");

describe("analyze", () => {
  it("sends a get request with encoded text", async () => {
    const text = "lorem ipsum dolor sit amet";

    axios.get = jest.fn(() => {
      return Promise.resolve("Result");
    });

    await sentiment.analyze(text);

    expect(axios.get).toBeCalledWith(
      sentiment.SENTIMENT_ANALYSIS_ENDPOINT +
        "?text=lorem%20ipsum%20dolor%20sit%20amet"
    );
  });

  it("returns the result of successful requests", () => {
    const text = "lorem ipsum dolor sit amet";
    const expectedResult = "Result";

    axios.get = jest.fn(() => {
      return Promise.resolve({ data: expectedResult });
    });

    const result = sentiment.analyze(text);

    return expect(result).resolves.toEqual(expectedResult);
  });

  xit("renders an error message to the user if there is an error with axios", async () => {
    const text = "lorem ipsum dolor sit amet";

    nativeUI.displayErrorMessage = jest.fn();

    axios.get = jest.fn(() => {
      return Promise.reject({ message: "Client Error" });
    });

    await sentiment.analyze(text);

    expect(nativeUI.displayErrorMessage).toBeCalledWith(
      "Client Error",
      "Client Error"
    );
  });

  xit("renders an error message to the user if there is an error with the request", async () => {
    const text = "lorem ipsum dolor sit amet";

    nativeUI.displayErrorMessage = jest.fn();

    axios.get = jest.fn(() => {
      return Promise.reject({ request: "Request Error" });
    });

    await sentiment.analyze(text);

    expect(nativeUI.displayErrorMessage).toBeCalledWith(
      "Request Error",
      "Request Error"
    );
  });

  xit("renders an error message to the user if there is an error with the response", async () => {
    const text = "lorem ipsum dolor sit amet";

    nativeUI.displayErrorMessage = jest.fn();

    axios.get = jest.fn(() => {
      return Promise.reject({ response: "API Error" });
    });

    await sentiment.analyze(text);

    expect(nativeUI.displayErrorMessage).toBeCalledWith(
      "API Error",
      "API Error"
    );
  });
});
