import { useEffect, useState } from 'react';

export type Option = {
  id: string;
  text: string;
  correct: boolean;
};

export function useMCQOptions(questionType: string) {
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
useEffect(() => {
  setShowOptions(false);

  if (questionType === 'boolean') {
    setOptions([
      { id: 'true', text: 'True', correct: false },
      { id: 'false', text: 'False', correct: false },
    ]);
    return;
  }

  if (questionType === 'numerical') {
    setOptions([]);
    return;
  }

  // single / multiple → start EMPTY
  setOptions([]);
}, [questionType]);

  const toggleCorrect = (id: string) => {
    setOptions((prev) =>
      questionType === 'multiple'
        ? prev.map((o) =>
            o.id === id ? { ...o, correct: !o.correct } : o
          )
        : prev.map((o) => ({
            ...o,
            correct: o.id === id,
          }))
    );
  };

  const updateText = (id: string, text: string) => {
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, text } : o))
    );
  };

  return {
    options,
    showOptions,
    setShowOptions,
    toggleCorrect,
    updateText,
  };
}
