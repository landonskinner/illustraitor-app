import { Difficulty } from "../types/difficulty";

type DifficultyButtonProps = {
  difficulty: Difficulty | "ready";
  onClick: () => void;
};

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  onClick,
}) => {
  const colorMap = {
    ready:
      "bg-[linear-gradient(90deg,#81cae3_0%,#81cae3_50%,#ea90fb_63%,#ffb6c1_87%,#ffdab9_100%)]",
    easy: "bg-[linear-gradient(90deg,#81cae3_0%,#81cae3_50%,#ea90fb_63%,#ffb6c1_87%,#ffdab9_100%)]",
    medium:
      "bg-[linear-gradient(90deg,#ffdab9_0%,#ffdab9_50%,#ffb6c1_63%,#ea90fb_87%,#81cae3_100%)]",
    hard: "bg-[linear-gradient(90deg,#ea90fb_0%,#ea90fb_50%,#81cae3_63%,#ffb6c1_87%,#ffdab9_100%)]",
  };
  return (
    <button
      className={`w-full flex p-2 rounded-lg bg-origin-padding bg-left transition-[background-position] duration-500 delay-[50ms] ease-in-out hover:bg-right ${colorMap[difficulty]}`}
      style={{
        backgroundSize: "200%",
      }}
      onClick={onClick}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        stroke="null"
        viewBox="0 0 65 16"
      >
        <text
          className="font-syne font-extrabold"
          fontFamily="Syne"
          transform="scale(1, 1.6)"
          y="10.75"
          textLength="100%"
          fill="white"
        >
          {difficulty.toUpperCase()}
        </text>
      </svg>
    </button>
  );
};

export default DifficultyButton;
