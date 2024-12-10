import { ReactNode } from "react";

interface InteractiveCanvasOverlayProps {
  children: ReactNode;
  isInteractive: boolean;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
}

const InteractiveCanvasOverlay = ({
  children,
  isInteractive,
  isLoading,
  onClick,
  className = "",
}: InteractiveCanvasOverlayProps) => {
  return (
    <div
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "Enter" && isInteractive) {
          onClick();
        }
      }}
      onClick={() => {
        if (isInteractive) onClick();
      }}
      className={`z-10 p-4 text-4xl flex justify-center items-center absolute top-0 left-0 w-full h-full font-bold text-white ${
        !isInteractive
          ? "animate-shimmer hover:cursor-default"
          : "hover:cursor-pointer"
      } ${className}`}
      style={{
        background: isLoading
          ? "linear-gradient(-45deg, rgba(231, 219, 247, 0.9) 25%, rgba(247, 219, 239, 0.9) 35%, rgba(247, 221, 219, 0.9) 40%, rgba(250,250,250,0.9) 50%, rgba(247, 221, 219, 0.9) 60%, rgba(247, 219, 239, 0.9) 65%, rgba(231, 219, 247, 0.9) 75%)"
          : "rgba(231, 219, 247, 0.9)",
        backgroundSize: "300%",
        backgroundPositionX: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default InteractiveCanvasOverlay;
