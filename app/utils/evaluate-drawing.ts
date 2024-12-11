type EvaluateDrawingParams = {
  prompt: string;
  canvas: HTMLCanvasElement;
};

type EvaluateDrawingResponse = {
  grade: string;
  comment: string;
};

const emptyResponse: EvaluateDrawingResponse = {
  grade: "",
  comment: "",
};

export const EvaluateDrawing = async ({
  prompt,
  canvas,
}: EvaluateDrawingParams): Promise<EvaluateDrawingResponse> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        prompt,
        image: canvas.toDataURL("image/jpeg"),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json as EvaluateDrawingResponse;
  } catch (error) {
    console.error("Error evaluating drawing:", error);
    return emptyResponse;
  }
};
