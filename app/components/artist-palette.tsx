import { Dispatch, SetStateAction, useState } from "react";
import { Trash2, BadgeCheck } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import {
  COLORS,
  DrawStyle,
  SHAPES,
  TOOLS,
  ToolShapeIconMap,
} from "@/app/types/drawing-styles";
import { cn } from "@/lib/utils";

type PaletteProps = {
  drawStyle: DrawStyle;
  setDrawStyle: Dispatch<SetStateAction<DrawStyle>>;
};

const ColorPalette = ({ drawStyle, setDrawStyle }: PaletteProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);
  return (
    <Popover open={popoverOpen} onOpenChange={togglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="size-11 p-0 rounded-full hover:bg-white/50"
        >
          <div
            style={{
              backgroundColor: drawStyle.color,
              width: drawStyle.brushWidth,
              height: drawStyle.brushWidth,
            }}
            className="rounded-full"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-4 gap-2 w-fit bg-ai-pink/20 backdrop-blur rounded-2xl border-ai-pink/10 shadow-ai-pink/70 shadow-2xl">
        {COLORS.map((c) => (
          <Button
            key={c}
            variant="ghost"
            className="size-11 rounded-full p-0 hover:bg-white/50"
            onClick={() => {
              setDrawStyle({ ...drawStyle, color: c });
              togglePopover();
            }}
          >
            <div
              style={{
                backgroundColor: c,
                width: drawStyle.brushWidth,
                height: drawStyle.brushWidth,
              }}
              className="rounded-full"
            />
          </Button>
        ))}
        <Slider
          className="col-span-4 mt-2"
          style={{ color: drawStyle.color }}
          min={5}
          max={40}
          step={1}
          value={[drawStyle.brushWidth]}
          onValueChange={(value) =>
            setDrawStyle({ ...drawStyle, brushWidth: value[0] })
          }
        />
      </PopoverContent>
    </Popover>
  );
};

const ToolPalette = ({ drawStyle, setDrawStyle }: PaletteProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const SelectedIcon =
    ToolShapeIconMap[
      [...TOOLS, ...SHAPES].find(
        (t) => drawStyle.tool === t || drawStyle.shape === t
      ) || "pencil"
    ];

  return (
    <Popover open={popoverOpen} onOpenChange={togglePopover}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="size-11 rounded-full hover:bg-white/50 [&_svg]:size-6"
        >
          <SelectedIcon stroke={drawStyle.color} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto space-x-2 bg-ai-pink/20 backdrop-blur rounded-full border-ai-pink/10 shadow-ai-pink/70 shadow-2xl">
        {TOOLS.map((tool) => {
          const Icon = ToolShapeIconMap[tool];
          return (
            <Button
              key={tool}
              variant="ghost"
              className={cn(
                "size-11 rounded-full hover:bg-white [&_svg]:size-6",
                tool === drawStyle.tool ? "bg-white" : "bg-white/30"
              )}
              onClick={() => {
                setDrawStyle({ ...drawStyle, tool, shape: null });
                togglePopover();
              }}
            >
              <Icon stroke={drawStyle.color} />
            </Button>
          );
        })}
        {SHAPES.map((shape) => {
          const Icon = ToolShapeIconMap[shape];
          return (
            <Button
              key={shape}
              variant="ghost"
              className={cn(
                "size-11 rounded-full hover:bg-white [&_svg]:size-6",
                shape === drawStyle.shape ? "bg-white" : "bg-white/30"
              )}
              onClick={() => {
                setDrawStyle({ ...drawStyle, shape, tool: null });
                togglePopover();
              }}
            >
              <Icon stroke={drawStyle.color} />
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export function ArtistPalette({
  drawStyle,
  setDrawStyle,
  clearCanvas,
  evaluateDrawing,
}: {
  drawStyle: DrawStyle;
  setDrawStyle: Dispatch<SetStateAction<DrawStyle>>;
  clearCanvas: () => void;
  evaluateDrawing: () => void;
}) {
  const btnClass =
    "aspect-square hover:scale-105 transition-transform w-fit shadow-md shadow-ai-pink/70 rounded-full shimmer-button backdrop-blur-lg animate-border-loader p-6 [&_svg]:size-6";
  return (
    <div className="w-full grid grid-cols-[80px_1fr_80px] sm:grid-cols-[120px_1fr_120px] items-center justify-between">
      <Button
        className={btnClass}
        id="clear-canvas"
        variant="ghost"
        onClick={clearCanvas}
      >
        <Trash2 className="icon-standby" stroke="currentColor" />
      </Button>
      <div className="rounded-full shimmer-button backdrop-blur-lg animate-border-loader shadow-md shadow-ai-pink/70 p-1 flex items-center space-x-1 w-fit mx-auto">
        <ToolPalette drawStyle={drawStyle} setDrawStyle={setDrawStyle} />
        <ColorPalette drawStyle={drawStyle} setDrawStyle={setDrawStyle} />
      </div>
      <Button
        className={cn(btnClass, "justify-self-end")}
        id="submit"
        variant="ghost"
        onClick={evaluateDrawing}
      >
        <BadgeCheck className="icon-standby" stroke="currentColor" />
      </Button>
    </div>
  );
}
