import { useState, ReactElement } from 'react';

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }

  function back() {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    steps,
  };
}
