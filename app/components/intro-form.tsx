import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DIFFICULTIES, Difficulty } from "../types/difficulty";

const IntroForm = ({
  showFirstStep,
  startGame,
}: {
  showFirstStep: boolean;
  startGame: (difficulty: Difficulty) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(showFirstStep ? 0 : 1);
  return (
    <>
      <h1 className="h-9 text-center">Draw something!</h1>
      <div className="w-full aspect-square p-4 rounded-lg bg-white border border-gray-300 shadow-lg">
        {currentStep === 0 ? (
          <div className="p-4 space-y-2">
            <h2 className="text-xl font-bold">How to play</h2>
            <p>
              Select your difficulty. Higher difficulty means more complex or
              abstract drawing subjects.
            </p>
            <p>Draw the prompt on the canvas.</p>
            <p>
              When you&apos;re ready, submit your drawing to see how your AI art
              teacher grades your drawing.
            </p>
            <Button
              variant="outline"
              className="uppercase"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Ready to Play
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2 w-full h-full justify-between">
            {DIFFICULTIES.map((difficulty) => {
              return (
                <Button
                  key={difficulty}
                  variant="outline"
                  className="uppercase grow"
                  onClick={() => startGame(difficulty)}
                >
                  {difficulty}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default IntroForm;
