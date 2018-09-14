import sentiment from "./sentiment";

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
});
