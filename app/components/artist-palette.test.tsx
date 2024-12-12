import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ArtistPalette } from "./artist-palette";
import { DrawStyle } from "@/app/types/drawing-styles";

describe("ArtistPalette", () => {
  const mockSetDrawStyle = jest.fn();
  const mockClearCanvas = jest.fn();
  const mockEvaluateDrawing = jest.fn();

  const drawStyle: DrawStyle = {
    color: "#000000",
    brushWidth: 10,
    tool: "pencil",
    shape: null,
  };

  // Mock ResizeObserver
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ArtistPalette component", () => {
    render(
      <ArtistPalette
        drawStyle={drawStyle}
        setDrawStyle={mockSetDrawStyle}
        clearCanvas={mockClearCanvas}
        evaluateDrawing={mockEvaluateDrawing}
      />
    );

    expect(screen.getByTestId("clear-canvas-button")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("calls clearCanvas when the clear button is clicked", () => {
    render(
      <ArtistPalette
        drawStyle={drawStyle}
        setDrawStyle={mockSetDrawStyle}
        clearCanvas={mockClearCanvas}
        evaluateDrawing={mockEvaluateDrawing}
      />
    );

    fireEvent.click(screen.getByTestId("clear-canvas-button"));
    expect(mockClearCanvas).toHaveBeenCalledTimes(1);
  });

  it("calls evaluateDrawing when the submit button is clicked", () => {
    render(
      <ArtistPalette
        drawStyle={drawStyle}
        setDrawStyle={mockSetDrawStyle}
        clearCanvas={mockClearCanvas}
        evaluateDrawing={mockEvaluateDrawing}
      />
    );

    fireEvent.click(screen.getByTestId("submit-button"));
    expect(mockEvaluateDrawing).toHaveBeenCalledTimes(1);
  });

  it("opens the color palette popover when the color button is clicked", () => {
    render(
      <ArtistPalette
        drawStyle={drawStyle}
        setDrawStyle={mockSetDrawStyle}
        clearCanvas={mockClearCanvas}
        evaluateDrawing={mockEvaluateDrawing}
      />
    );

    fireEvent.click(screen.getByTestId("color-palette-trigger"));
    expect(screen.getByTestId("color-palette-content")).toBeInTheDocument();
  });

  it("opens the tool palette popover when the tool button is clicked", () => {
    render(
      <ArtistPalette
        drawStyle={drawStyle}
        setDrawStyle={mockSetDrawStyle}
        clearCanvas={mockClearCanvas}
        evaluateDrawing={mockEvaluateDrawing}
      />
    );

    fireEvent.click(screen.getByTestId("tool-palette-trigger"));
    expect(screen.getByTestId("tool-palette-content")).toBeInTheDocument();
  });
});
