import { useState } from "react";

const useCounter = (initialState = 0, max, min, step) => {
  const [value, setValue] = useState(min ? min : initialState);

  const increase = () => {
    let auxValue = value;
    if (max && max <= auxValue) return;
    auxValue = auxValue + (step ? step : 1);
    setValue(auxValue);
  };

  const decrease = () => {
    let auxValue = value;
    if (min && min >= auxValue) return;
    auxValue = auxValue - (step ? step : 1);
    setValue(auxValue);
  };

  const reset = () => setValue(initialState);

  return { value, increase, decrease, reset };
};

export default useCounter;
