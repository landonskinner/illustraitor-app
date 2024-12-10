import { Dispatch, SetStateAction, useState } from "react";
import {
  Paintbrush,
  Eraser,
  Square,
  Circle,
  Triangle,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { COLORS, DrawStyle, SHAPES, TOOLS } from "@/app/types/drawing-styles";

const IconMap = {
  rectangle: <Square className="h-4 w-4" />,
  circle: <Circle className="h-4 w-4" />,
  triangle: <Triangle className="h-4 w-4" />,
  line: <Minus className="h-4 w-4" />,
  eraser: <Eraser className="h-4 w-4" />,
  pencil: <Paintbrush className="h-4 w-4" />,
};

export function ArtistPalette({
  drawStyle,
  setDrawStyle,
}: {
  drawStyle: DrawStyle;
  setDrawStyle: Dispatch<SetStateAction<DrawStyle>>;
}) {
  const [popoverOpen, setPopoverOpen] = useState({
    color: false,
    tool: false,
  });

  return (
    <div className="border-loading animate-rainbow-wheel rounded-lg shadow-lg p-1 flex items-center space-x-1 w-fit mx-auto">
      <Popover
        open={popoverOpen.tool}
        onOpenChange={() =>
          setPopoverOpen({ ...popoverOpen, tool: !popoverOpen.tool })
        }
      >
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-11 w-11">
            {
              IconMap[
                [...TOOLS, ...SHAPES].find(
                  (t) => drawStyle.tool === t || drawStyle.shape === t
                ) || "pencil"
              ]
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex space-x-2">
            {TOOLS.map((tool) => (
              <Button
                key={tool}
                variant={drawStyle.tool === tool ? "default" : "outline"}
                size="icon"
                onClick={() => {
                  setDrawStyle({ ...drawStyle, tool, shape: null });
                  setPopoverOpen({ ...popoverOpen, tool: false });
                }}
              >
                {IconMap[tool]}
              </Button>
            ))}
            {SHAPES.map((shape) => (
              <Button
                key={shape}
                variant={drawStyle.shape === shape ? "default" : "outline"}
                size="icon"
                onClick={() => {
                  setDrawStyle({ ...drawStyle, shape, tool: null });
                  setPopoverOpen({ ...popoverOpen, tool: false });
                }}
              >
                {IconMap[shape]}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover
        open={popoverOpen.color}
        onOpenChange={() =>
          setPopoverOpen({ ...popoverOpen, color: !popoverOpen.color })
        }
      >
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-11 h-11 p-0">
            <div
              style={{
                backgroundColor: drawStyle.color,
                width: drawStyle.brushWidth,
                height: drawStyle.brushWidth,
              }}
              className="p-0 rounded-full border border-gray-300"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: c }}
                onClick={() => {
                  setDrawStyle({ ...drawStyle, color: c });
                  setPopoverOpen({ ...popoverOpen, color: false });
                }}
              />
            ))}
            <Slider
              className="col-span-4"
              style={{ color: drawStyle.color }}
              min={5}
              max={40}
              step={1}
              value={[drawStyle.brushWidth]}
              onValueChange={(value) =>
                setDrawStyle({ ...drawStyle, brushWidth: value[0] })
              }
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* <div className="w-40">
        <Slider
          style={{ color: drawStyle.color }}
          min={5}
          max={40}
          step={1}
          value={[drawStyle.brushWidth]}
          onValueChange={(value) =>
            setDrawStyle({ ...drawStyle, brushWidth: value[0] })
          }
        />
      </div> */}
    </div>
  );
}
