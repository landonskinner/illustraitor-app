import { cn } from "@/lib/utils";

type GameHeaderProps = {
  showHeader: boolean;
  prompt: string;
  highScore?: number;
  score: number;
  time: string;
};

const GameHeader = ({
  showHeader,
  prompt,
  highScore = 0,
  score,
  time,
}: GameHeaderProps) => {
  return (
    <header
      className={cn(
        "absolute px-2 sm:px-4 grid grid-cols-[85px_1fr_85px] font-bold gap-x-4 items-center text-white w-full h-header transition-[top_opacity] delay-1000 duration-300",
        showHeader ? "opacity-100 -top-header" : "opacity-0 top-0"
      )}
    >
      <section className="grid grid-cols-2 items-center gap-x-2 sm:gap-x-4">
        {!!highScore && (
          <>
            <span className="font-normal">High</span>
            <span className="text-right">{highScore}</span>
          </>
        )}
        <span className="font-normal">Current</span>
        <span className="text-right">{score}</span>
      </section>
      <h2 className="font-black text-xl sm:text-4xl uppercase text-center">
        {prompt}
      </h2>
      <p className="text-xl sm:text-3xl text-right">{time}</p>
    </header>
  );
};

export default GameHeader;
