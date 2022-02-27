import { useState } from "react";

const useInput = (validation) => {
  const [enteredData, setEnteredData] = useState("");
  const [isTuched, setIsTuched] = useState(false);

  const changeHandler = (event) => {
    setEnteredData(event.target.value);
  };

  const blurHandler = () => setIsTuched(true);

  const reset = () => {
    setEnteredData("");
    setIsTuched(false);
  };

  const enteredDataIsValid = validation(enteredData);
  const enteredDataIsInValid = !enteredDataIsValid && isTuched;

  return {
    enteredData,
    changeHandler,
    blurHandler,
    enteredDataIsValid,
    enteredDataIsInValid,
    reset,
  };
};

export default useInput;
