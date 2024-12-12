import { useEffect, useState } from "react";

type GameHeaderProps = {
  prompt: string;
  score: number;
  time: string;
};

const GameHeader = ({ prompt, score, time }: GameHeaderProps) => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const localHighScore = localStorage.getItem("highScore");
    setHighScore(localHighScore ? parseInt(localHighScore) : 0);
  }, []);

  return (
    <header className="absolute opacity-0 animate-fade-in -top-header overflow-hidden px-2 sm:px-4 grid grid-cols-[85px_1fr_85px] font-bold gap-x-4  h-header items-center text-white w-full">
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
