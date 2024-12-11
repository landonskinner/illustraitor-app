import { useState } from "react";
import { DIFFICULTIES, Difficulty } from "../types/difficulty";
import DifficultyButton from "./difficulty-button";
import Logo from "./logo";

const Step1 = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button
      className="unset h-full flex flex-col items-center justify-center space-y-4 row-span-3 self-center hover:cursor-pointer text-center"
      onClick={handleClick}
    >
      <Logo className="scale-[1.75] sm:scale-[2.5]" />
      <div className="text-ai-pink/50 font-bold">Click to begin</div>
    </button>
  );
};

const Step2 = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <>
      <div className="row-span-2 flex flex-col text-ai-pink h-full">
        <Logo />
        <h3 className="text-md sm:text-xl font-black uppercase">How to Play</h3>
        <ul className="list-decimal list-inside">
          {[
            "Select your difficulty.",
            "Draw the prompt quickly and accurately.",
            "Submit your drawing to be graded.",
            "Repeat until time runs out.",
          ].map((step, i) => (
            <li
              key={i}
              className="marker:font-semibold text-md sm:text-lg leading-snug"
            >
              {step}
            </li>
          ))}
        </ul>
        <div className="text-md sm:text-lg font-black leading-snug mt-auto">
          You have 1 minute and will receive 1 point for each drawing with a
          passing grade. Balance speed and accuracy for the best score!
        </div>
      </div>
      <DifficultyButton difficulty="ready" onClick={handleClick} />
    </>
  );
};

const Step3 = ({
  startGame,
}: {
  startGame: (difficulty: Difficulty) => void;
}) =>
  DIFFICULTIES.map((difficulty) => (
    <DifficultyButton
      key={difficulty}
      difficulty={difficulty}
      onClick={() => startGame(difficulty)}
    />
  ));

const IntroForm = ({
  showFirstStep,
  startGame,
}: {
  showFirstStep: boolean;
  startGame: (difficulty: Difficulty) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(showFirstStep ? 0 : 2);
  const handleClick = () => setCurrentStep(currentStep + 1);
  const formSteps = [Step1, Step2, Step3];
  const FormStep = formSteps[currentStep];
  return (
    <div className="p-4 grid grid-rows-3 gap-y-2 w-full h-full">
      <FormStep handleClick={handleClick} startGame={startGame} />
    </div>
  );
};

export default IntroForm;
