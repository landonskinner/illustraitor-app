const CanvasWrapper = ({ children }) => {
  return (
    <div className="relative overflow-hidden sm:aspect-square max-w-[500px] w-full rounded-lg bg-white border-loading animate-border-loader shadow-lg shadow-[#e990fb46]">
      {children}
    </div>
  );
};

export const CanvasHeader = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-[120px_1fr_120px] items-center justify-between">
      {children}
    </div>
  );
};

export default CanvasWrapper;
