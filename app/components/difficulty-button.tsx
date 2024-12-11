import { Difficulty } from "../types/difficulty";

type DifficultyButtonProps = {
  difficulty: Difficulty | "ready";
  onClick: () => void;
};

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  onClick,
}) => {
  return (
    <button
      className={`z-20 w-full flex p-2 rounded-lg bg-origin-padding bg-left hover:bg-right ${difficulty}-button`}
      style={{
        transition: "background-position 0.5s ease-in-out 50ms",
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
          className="font-extrabold"
          transform="scale(1, 1.6)"
          y="10.75"
          textLength="65"
          fill="white"
        >
          {difficulty.toUpperCase()}
        </text>
      </svg>
    </button>
  );
};

export default DifficultyButton;
