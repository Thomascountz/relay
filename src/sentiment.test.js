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

  it("returns the result of successful requests", async () => {
    const text = "lorem ipsum dolor sit amet";
    const expectedResult = "Result";

    axios.get = jest.fn(() => {
      return Promise.resolve({ data: expectedResult });
    });

    const result = await sentiment.analyze(text);

    expect(result).toEqual(expectedResult);
  });

  it("sends reports errors to the console for unsuccessful requests", async () => {
    const text = "lorem ipsum dolor sit amet";

    console.log = jest.fn();

    axios.get = jest.fn(() => {
      return Promise.reject(new Error());
    });

    await sentiment.analyze(text);

    expect(console.log).toBeCalledWith(new Error());
  });
});
