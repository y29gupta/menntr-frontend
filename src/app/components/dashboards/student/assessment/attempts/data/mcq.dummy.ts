export type McqQuestion = {
  id: number;
  question: string;
  options: string[];
  correctOption: number; // index
};

export const mcqDummyQuestions: McqQuestion[] = [
  {
    id: 1,
    question: 'What is the difference between a list and a tuple in Python?',
    options: [
      'Lists are mutable, tuples are immutable',
      'Lists are faster than tuples',
      'Tuples can store mixed data',
      'There is no difference',
    ],
    correctOption: 0,
  },
  {
    id: 2,
    question: 'Which keyword is used to define a function in Python?',
    options: ['func', 'define', 'def', 'function'],
    correctOption: 2,
  },
  {
    id: 3,
    question: 'What is the output of: print(type([]))?',
    options: [
      "<class 'tuple'>",
      "<class 'list'>",
      "<class 'array'>",
      "<class 'dict'>",
    ],
    correctOption: 1,
  },
  {
    id: 4,
    question: 'Which of the following is immutable?',
    options: ['List', 'Set', 'Dictionary', 'Tuple'],
    correctOption: 3,
  },
  {
    id: 5,
    question: 'What does len() function do?',
    options: [
      'Returns memory size',
      'Returns number of elements',
      'Returns data type',
      'Returns index',
    ],
    correctOption: 1,
  },
  {
    id: 6,
    question: 'Which operator is used for exponentiation?',
    options: ['^', '**', '//', '%'],
    correctOption: 1,
  },
  {
    id: 7,
    question: 'What is the correct file extension for Python files?',
    options: ['.pt', '.py', '.python', '.pyt'],
    correctOption: 1,
  },
  {
    id: 8,
    question: 'Which data type is used to store key-value pairs?',
    options: ['List', 'Tuple', 'Set', 'Dictionary'],
    correctOption: 3,
  },
  {
    id: 9,
    question: 'What does break do in a loop?',
    options: [
      'Skips iteration',
      'Stops the loop',
      'Restarts loop',
      'Pauses loop',
    ],
    correctOption: 1,
  },
  {
    id: 10,
    question: 'Which of these is a valid variable name?',
    options: ['1value', 'value-1', '_value', 'value@'],
    correctOption: 2,
  },

  /* ---------- 11–20 ---------- */

  {
    id: 11,
    question: 'Which keyword is used to handle exceptions?',
    options: ['try', 'catch', 'error', 'handle'],
    correctOption: 0,
  },
  {
    id: 12,
    question: 'What is the output of bool(0)?',
    options: ['True', 'False', '0', 'Error'],
    correctOption: 1,
  },
  {
    id: 13,
    question: 'Which collection does not allow duplicate values?',
    options: ['List', 'Tuple', 'Set', 'Dictionary'],
    correctOption: 2,
  },
  {
    id: 14,
    question: 'What is used to create an empty dictionary?',
    options: ['{}', '[]', '()', 'set()'],
    correctOption: 0,
  },
  {
    id: 15,
    question: 'Which loop is used when number of iterations is unknown?',
    options: ['for', 'while', 'do-while', 'repeat'],
    correctOption: 1,
  },
  {
    id: 16,
    question: 'What does continue do in a loop?',
    options: [
      'Stops loop',
      'Skips current iteration',
      'Restarts loop',
      'Ends program',
    ],
    correctOption: 1,
  },
  {
    id: 17,
    question: 'Which function converts string to integer?',
    options: ['str()', 'int()', 'float()', 'bool()'],
    correctOption: 1,
  },
  {
    id: 18,
    question: 'What is the default return value of a function?',
    options: ['0', 'False', 'None', 'Undefined'],
    correctOption: 2,
  },
  {
    id: 19,
    question: 'Which operator checks identity?',
    options: ['==', '=', 'is', '!='],
    correctOption: 2,
  },
  {
    id: 20,
    question: 'What does isinstance() check?',
    options: [
      'Object value',
      'Object type',
      'Object length',
      'Object memory',
    ],
    correctOption: 1,
  },

  /* ---------- 21–30 ---------- */

  // {
  //   id: 21,
  //   question: 'Which method adds an element to a list?',
  //   options: ['add()', 'append()', 'insert()', 'Both append and insert'],
  //   correctOption: 3,
  // },
  // {
  //   id: 22,
  //   question: 'What is slicing used for?',
  //   options: [
  //     'Looping',
  //     'Extracting sequence parts',
  //     'Sorting',
  //     'Deleting elements',
  //   ],
  //   correctOption: 1,
  // },
  // {
  //   id: 23,
  //   question: 'Which keyword creates a class?',
  //   options: ['struct', 'define', 'class', 'object'],
  //   correctOption: 2,
  // },
  // {
  //   id: 24,
  //   question: 'What does self refer to?',
  //   options: [
  //     'Current class',
  //     'Current instance',
  //     'Parent class',
  //     'Global object',
  //   ],
  //   correctOption: 1,
  // },
  // {
  //   id: 25,
  //   question: 'Which file mode is used to append?',
  //   options: ['r', 'w', 'a', 'x'],
  //   correctOption: 2,
  // },
  // {
  //   id: 26,
  //   question: 'What is the output of len("Python")?',
  //   options: ['5', '6', '7', 'Error'],
  //   correctOption: 1,
  // },
  // {
  //   id: 27,
  //   question: 'Which function returns sorted list?',
  //   options: ['sort()', 'sorted()', 'order()', 'arrange()'],
  //   correctOption: 1,
  // },
  // {
  //   id: 28,
  //   question: 'What does pop() do?',
  //   options: [
  //     'Deletes last element',
  //     'Adds element',
  //     'Sorts list',
  //     'Clears list',
  //   ],
  //   correctOption: 0,
  // },
  // {
  //   id: 29,
  //   question: 'Which symbol is used for comments?',
  //   options: ['//', '#', '/* */', '<!-- -->'],
  //   correctOption: 1,
  // },
  // {
  //   id: 30,
  //   question: 'What does input() return?',
  //   options: ['Integer', 'Float', 'String', 'Boolean'],
  //   correctOption: 2,
  // },

  // /* ---------- 31–40 ---------- */

  // {
  //   id: 31,
  //   question: 'Which module supports regular expressions?',
  //   options: ['regex', 'pyregex', 're', 'match'],
  //   correctOption: 2,
  // },
  // {
  //   id: 32,
  //   question: 'What does map() return?',
  //   options: ['List', 'Tuple', 'Map object', 'Set'],
  //   correctOption: 2,
  // },
  // {
  //   id: 33,
  //   question: 'Which keyword deletes a variable?',
  //   options: ['remove', 'delete', 'del', 'clear'],
  //   correctOption: 2,
  // },
  // {
  //   id: 34,
  //   question: 'What is used to handle files?',
  //   options: ['open()', 'read()', 'file()', 'load()'],
  //   correctOption: 0,
  // },
  // {
  //   id: 35,
  //   question: 'Which data type stores True/False?',
  //   options: ['int', 'str', 'bool', 'binary'],
  //   correctOption: 2,
  // },
  // {
  //   id: 36,
  //   question: 'Which keyword inherits a class?',
  //   options: ['extends', 'inherits', 'super', 'class'],
  //   correctOption: 3,
  // },
  // {
  //   id: 37,
  //   question: 'What does pass do?',
  //   options: [
  //     'Ends loop',
  //     'Skips execution',
  //     'Acts as placeholder',
  //     'Raises error',
  //   ],
  //   correctOption: 2,
  // },
  // {
  //   id: 38,
  //   question: 'Which function converts to float?',
  //   options: ['int()', 'str()', 'float()', 'bool()'],
  //   correctOption: 2,
  // },
  // {
  //   id: 39,
  //   question: 'Which method removes all elements?',
  //   options: ['clear()', 'remove()', 'pop()', 'delete()'],
  //   correctOption: 0,
  // },
  // {
  //   id: 40,
  //   question: 'Which operator performs floor division?',
  //   options: ['/', '//', '%', '**'],
  //   correctOption: 1,
  // },

  // /* ---------- 41–50 ---------- */

  // {
  //   id: 41,
  //   question: 'Which data type is ordered?',
  //   options: ['Set', 'Dictionary', 'List', 'None'],
  //   correctOption: 2,
  // },
  // {
  //   id: 42,
  //   question: 'What is None in Python?',
  //   options: [
  //     'Zero',
  //     'Empty string',
  //     'No value',
  //     'False',
  //   ],
  //   correctOption: 2,
  // },
  // {
  //   id: 43,
  //   question: 'Which loop always runs at least once?',
  //   options: ['for', 'while', 'do-while', 'None'],
  //   correctOption: 2,
  // },
  // {
  //   id: 44,
  //   question: 'Which keyword exits a function?',
  //   options: ['exit', 'stop', 'return', 'break'],
  //   correctOption: 2,
  // },
  // {
  //   id: 45,
  //   question: 'What is the output of type(None)?',
  //   options: [
  //     "<class 'NoneType'>",
  //     "<class 'null'>",
  //     "<class 'void'>",
  //     "<class 'empty'>",
  //   ],
  //   correctOption: 0,
  // },
  // {
  //   id: 46,
  //   question: 'Which method finds length of list?',
  //   options: ['count()', 'size()', 'len()', 'length()'],
  //   correctOption: 2,
  // },
  // {
  //   id: 47,
  //   question: 'What does zip() do?',
  //   options: [
  //     'Compress files',
  //     'Combine iterables',
  //     'Encrypt data',
  //     'Sort lists',
  //   ],
  //   correctOption: 1,
  // },
  // {
  //   id: 48,
  //   question: 'Which keyword is used for lambda?',
  //   options: ['func', 'def', 'lambda', 'inline'],
  //   correctOption: 2,
  // },
  // {
  //   id: 49,
  //   question: 'Which function raises an exception?',
  //   options: ['throw', 'raise', 'error', 'exception'],
  //   correctOption: 1,
  // },
  // {
  //   id: 50,
  //   question: 'Which statement stops program execution?',
  //   options: ['exit()', 'stop()', 'break', 'end'],
  //   correctOption: 0,
  // },
];
