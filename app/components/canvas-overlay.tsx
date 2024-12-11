import { ReactNode } from "react";

type InteractiveCanvasOverlayProps = {
  children: ReactNode;
  isInteractive: boolean;
  onClick: () => void;
  className?: string;
};

const InteractiveCanvasOverlay = ({
  children,
  isInteractive,
  onClick,
  className = "",
}: InteractiveCanvasOverlayProps) => {
  return (
    <button
      disabled={!isInteractive}
      onClick={onClick}
      className={`z-10 p-4 text-4xl flex flex-col gap-y-4 justify-center overlay-loading animate-text-loader text-transparent items-center absolute top-0 left-0 w-full h-full font-bold ${
        !isInteractive ? "hover:cursor-default" : "hover:cursor-pointer"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default InteractiveCanvasOverlay;
