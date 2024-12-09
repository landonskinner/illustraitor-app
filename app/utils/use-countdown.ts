import { useEffect, useState } from "react";

// const formatTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${minutes.toString()}:${remainingSeconds
//     .toString()
//     .padStart(2, "0")}`;
// };

export const useCountdown = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  const toggleTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return { time, toggleTimer, resetTimer, isRunning };
};
