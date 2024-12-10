import { ReactNode } from "react";

type CanvasHeaderProps = {
  children: ReactNode;
};

export const CanvasHeader = ({ children }: CanvasHeaderProps) => {
  return (
    <div className="w-full grid grid-cols-[80px_1fr_80px] sm:grid-cols-[120px_1fr_120px] items-center justify-between">
      {children}
    </div>
  );
};
