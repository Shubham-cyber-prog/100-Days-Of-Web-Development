import { useState } from "react";

const useStateWithHistory = <T>(initialValue: T, capacity: number = 10) => {
  const [state, setState] = useState<T>(initialValue);
  const [history, setHistory] = useState<T[]>([initialValue]);
  const [pointer, setPointer] = useState(0);

  const set = (value: T) => {
    const newHistory = [...history.slice(0, pointer + 1), value].slice(
      -capacity
    );
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
    setState(value);
  };

  const undo = () => {
    if (pointer > 0) {
      setPointer((p) => p - 1);
      setState(history[pointer - 1]);
    }
  };

  const redo = () => {
    if (pointer < history.length - 1) {
      setPointer((p) => p + 1);
      setState(history[pointer + 1]);
    }
  };

  return { state, set, undo, redo, history };
};

export default useStateWithHistory;
