import { drawShape } from "./draw-shapes";
import { Shape } from "../types/drawing-styles";

describe("drawShape", () => {
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    ctx = {
      fillRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
  });

  it("should draw a rectangle", () => {
    const shape = drawShape("rectangle");
    shape?.({
      ctx,
      pos: { x: 10, y: 10 },
      prevMouseX: 20,
      prevMouseY: 20,
    });
    expect(ctx.fillRect).toHaveBeenCalledWith(10, 10, 10, 10);
  });

  it("should draw a circle", () => {
    const shape = drawShape("circle");
    shape?.({
      ctx,
      pos: { x: 10, y: 10 },
      prevMouseX: 20,
      prevMouseY: 20,
    });
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledWith(
      20,
      20,
      Math.sqrt(200),
      0,
      2 * Math.PI
    );
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("should draw a triangle", () => {
    const shape = drawShape("triangle");
    shape?.({
      ctx,
      pos: { x: 10, y: 10 },
      prevMouseX: 20,
      prevMouseY: 20,
    });
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.lineTo).toHaveBeenCalledWith(30, 10);
    expect(ctx.closePath).toHaveBeenCalled();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("should draw a line", () => {
    const shape = drawShape("line");
    shape?.({
      ctx,
      pos: { x: 10, y: 10 },
      prevMouseX: 20,
      prevMouseY: 20,
    });
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it("should return undefined for an invalid shape", () => {
    const shape = drawShape("invalid" as Shape);
    expect(shape).toBeUndefined();
  });
});
