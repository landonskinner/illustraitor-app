import { EvaluateDrawing } from "./evaluate-drawing";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ grade: "A", comment: "Great job!" }),
  })
) as jest.Mock;

describe("EvaluateDrawing", () => {
  const originalConsoleError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("should return a grade and comment when the API call is successful", async () => {
    const mockCanvas = document.createElement("canvas");
    const response = await EvaluateDrawing({
      prompt: "cat",
      canvas: mockCanvas,
    });

    expect(response).toEqual({ grade: "A", comment: "Great job!" });
  });

  it("should return an empty response when the API call fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("API is down"))
    );

    const mockCanvas = document.createElement("canvas");
    const response = await EvaluateDrawing({
      prompt: "cat",
      canvas: mockCanvas,
    });

    expect(response).toEqual({ grade: "", comment: "" });
  });
});
