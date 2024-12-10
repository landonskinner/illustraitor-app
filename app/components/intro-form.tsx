import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DIFFICULTIES, Difficulty } from "../types/difficulty";
import { Diff } from "lucide-react";
import DifficultyButton from "./difficulty-button";
import CanvasWrapper from "./canvas-wrapper";

const IntroForm = ({
  showFirstStep,
  startGame,
}: {
  showFirstStep: boolean;
  startGame: (difficulty: Difficulty) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(showFirstStep ? 0 : 1);
  return (
    <div className="p-4 grid grid-rows-3 gap-y-2 w-full h-full">
      {currentStep === 0 ? (
        <>
          <div className="row-span-2">
            <h2 className="text-2xl font-semibold text-center">
              This is Illustr(ai)tor!
            </h2>
            <h3 className="text-xl font-semibold ">Here&apos;s how to play:</h3>
            <p className=" text-gray-700 text-sm sm:text-lg">
              You will be challenged to make quick drawings based on random
              prompts. When ready, submit your drawing to be graded by your art
              teacher.
            </p>
            <p className=" text-gray-700 text-sm sm:text-lg">
              You will have 1 minute to complete as many drawings as you can.
              The more accurate your drawing, the higher your score! However,
              your score is only based on the number of passing grades. Balance
              speed and accuracy to get the highest score!
            </p>
            <p className=" text-gray-700 text-sm sm:text-lg">
              If you're ready, it's time to select your difficulty.
            </p>
          </div>
          {/* <div className="flex justify-center mt-auto"> */}
          <DifficultyButton
            difficulty="ready"
            onClick={() => setCurrentStep(currentStep + 1)}
          />
          {/* </div> */}
        </>
      ) : (
        DIFFICULTIES.map((difficulty, i) => {
          return (
            <DifficultyButton
              key={difficulty}
              difficulty={difficulty}
              onClick={() => startGame(difficulty)}
            />
          );
        })
      )}
    </div>
  );
};
export default IntroForm;
