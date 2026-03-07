import { useState } from "react";

const useArray = <T>(initialArray: T[]) => {
  const [array, setArray] = useState<T[]>(initialArray);

  return {
    array,
    setArray,
    push: (element: T) => setArray((a) => [...a, element]),
    remove: (index: number) => setArray((a) => a.filter((_, i) => i !== index)),
    clear: () => setArray([]),
    update: (index: number, newElement: T) =>
      setArray((a) => a.map((el, i) => (i === index ? newElement : el))),
  };
};

export default useArray;
