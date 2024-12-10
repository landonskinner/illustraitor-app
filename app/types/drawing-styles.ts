export type Tool = (typeof TOOLS)[number] | null;
export const TOOLS = ["pencil", "eraser"] as const;

export const COLORS = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#8B00FF",
  "#FFFFFF",
  "#A52A2A",
  "#000000",
  "#808080",
  "#A9A9A9",
] as const;

export type Color = (typeof COLORS)[number];
export const SHAPES = ["rectangle", "circle", "triangle", "line"] as const;
export type Shape = (typeof SHAPES)[number] | null;
export type DrawStyle = {
  tool: Tool;
  brushWidth: number;
  color: Color;
  shape: Shape;
};
