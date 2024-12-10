import { useState } from "react";
import { DIFFICULTIES, Difficulty } from "../types/difficulty";
import DifficultyButton from "./difficulty-button";
import Logo from "./logo";

const IntroForm = ({
  showFirstStep,
  startGame,
}: {
  showFirstStep: boolean;
  startGame: (difficulty: Difficulty) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(showFirstStep ? 0 : 2);
  const formSteps = [
    <div
      key={0}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setCurrentStep(currentStep + 1);
        }
      }}
      className="h-full flex flex-col items-center justify-center space-y-4 row-span-3 self-center hover:cursor-pointer text-center"
      onClick={() => setCurrentStep(currentStep + 1)}
    >
      <Logo className="scale-[1.75] sm:scale-[2.5]" />
      <div className="text-[#e990fb82] font-bold">Click to begin</div>
    </div>,
    <>
      <div className="row-span-2">
        <h3 className="text-xl font-semibold ">Here&apos;s how to play:</h3>
        <p className=" text-gray-700 text-sm sm:text-lg">
          You will be challenged to make quick drawings based on random prompts.
          When ready, submit your drawing to be graded by your art teacher.
        </p>
        <p className=" text-gray-700 text-sm sm:text-lg">
          You will have 1 minute to complete as many drawings as you can. The
          more accurate your drawing, the higher your score! However, your score
          is only based on the number of passing grades. Balance speed and
          accuracy to get the highest score!
        </p>
        <p className=" text-gray-700 text-sm sm:text-lg">
          If you&apos;re ready, it&apos;s time to select your difficulty.
        </p>
      </div>
      <DifficultyButton
        difficulty="ready"
        onClick={() => setCurrentStep(currentStep + 1)}
      />
    </>,
    DIFFICULTIES.map((difficulty) => {
      return (
        <DifficultyButton
          key={difficulty}
          difficulty={difficulty}
          onClick={() => startGame(difficulty)}
        />
      );
    }),
  ];
  return (
    <div className="p-4 grid grid-rows-3 gap-y-2 w-full h-full">
      {formSteps[currentStep]}
    </div>
  );
};
export default IntroForm;
