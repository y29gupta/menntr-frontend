import { QuestionReport } from './responses.types';

export const questionsData: QuestionReport[] = [
  {
    id: 1,
    questionNo: 'Q1',
    type: 'CODING',
    title: 'Binary search on sorted array',
    difficulty: 'Easy',
    marksObtained: 6,
    totalMarks: 10,
    language: 'Python',
    code: `def binary_search(arr, x):
  l, r = 0, len(arr)-1
  while l <= r:
    m = (l+r)//2
    if arr[m] == x: return m
    elif arr[m] < x: l = m+1
    else: r = m-1
  return -1`,
    testPassed: 6,
    testTotal: 10,
  },

  {
    id: 2,
    questionNo: 'Q2',
    type: 'MCQ',
    title: 'FIFO data structure',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    selectedOption: 1,
    correctOption: 1,
  },

  {
    id: 3,
    questionNo: 'Q3',
    type: 'CODING',
    title: 'Reverse a string',
    difficulty: 'Easy',
    marksObtained: 5,
    totalMarks: 5,
    language: 'Python',
    code: `def reverse(s):
  return s[::-1]`,
    testPassed: 5,
    testTotal: 5,
  },

  {
    id: 4,
    questionNo: 'Q4',
    type: 'MCQ',
    title: '2 ** 4 equals?',
    difficulty: 'Easy',
    marksObtained: 0,
    totalMarks: 1,
    options: ['6', '8', '16', '32'],
    selectedOption: 1,
    correctOption: 2,
  },

  {
    id: 5,
    questionNo: 'Q5',
    type: 'CODING',
    title: 'Find max element in array',
    difficulty: 'Medium',
    marksObtained: 4,
    totalMarks: 10,
    language: 'Python',
    code: `def max_el(arr):
  m = arr[0]
  for x in arr:
    if x > m: m = x
  return m`,
    testPassed: 4,
    testTotal: 10,
  },

  {
    id: 6,
    questionNo: 'Q6',
    type: 'MCQ',
    title: 'Time complexity of binary search',
    difficulty: 'Medium',
    marksObtained: 1,
    totalMarks: 1,
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    selectedOption: 1,
    correctOption: 1,
  },

  {
    id: 7,
    questionNo: 'Q7',
    type: 'CODING',
    title: 'Palindrome check',
    difficulty: 'Medium',
    marksObtained: 3,
    totalMarks: 10,
    language: 'Python',
    code: `def is_pal(s):
  return s == s[::-1]`,
    testPassed: 3,
    testTotal: 10,
  },

  {
    id: 8,
    questionNo: 'Q8',
    type: 'MCQ',
    title: 'Which is mutable?',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['tuple', 'list', 'string', 'int'],
    selectedOption: 1,
    correctOption: 1,
  },

  {
    id: 9,
    questionNo: 'Q9',
    type: 'CODING',
    title: 'Sum of array elements',
    difficulty: 'Easy',
    marksObtained: 10,
    totalMarks: 10,
    language: 'Python',
    code: `def sum_arr(arr):
  return sum(arr)`,
    testPassed: 10,
    testTotal: 10,
  },

  {
    id: 10,
    questionNo: 'Q10',
    type: 'MCQ',
    title: 'Python keyword for function',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['func', 'define', 'def', 'lambda'],
    selectedOption: 2,
    correctOption: 2,
  },

  {
    id: 11,
    questionNo: 'Q11',
    type: 'CODING',
    title: 'Two Sum problem',
    difficulty: 'Hard',
    marksObtained: 6,
    totalMarks: 10,
    language: 'Python',
    code: `def two_sum(nums, t):
  mp={}
  for i,n in enumerate(nums):
    if t-n in mp: return [mp[t-n], i]
    mp[n]=i`,
    testPassed: 6,
    testTotal: 10,
  },

  {
    id: 12,
    questionNo: 'Q12',
    type: 'MCQ',
    title: 'Which uses LIFO?',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['Queue', 'Stack', 'Heap', 'Graph'],
    selectedOption: 1,
    correctOption: 1,
  },

  {
    id: 13,
    questionNo: 'Q13',
    type: 'CODING',
    title: 'Factorial using loop',
    difficulty: 'Medium',
    marksObtained: 7,
    totalMarks: 10,
    language: 'Python',
    code: `def fact(n):
  r=1
  for i in range(1,n+1):
    r*=i
  return r`,
    testPassed: 7,
    testTotal: 10,
  },

  {
    id: 14,
    questionNo: 'Q14',
    type: 'MCQ',
    title: 'Default value of boolean',
    difficulty: 'Easy',
    marksObtained: 0,
    totalMarks: 1,
    options: ['0', 'None', 'False', 'True'],
    selectedOption: 3,
    correctOption: 2,
  },

  {
    id: 15,
    questionNo: 'Q15',
    type: 'CODING',
    title: 'Check even or odd',
    difficulty: 'Easy',
    marksObtained: 5,
    totalMarks: 5,
    language: 'Python',
    code: `def even(n):
  return n%2==0`,
    testPassed: 5,
    testTotal: 5,
  },

  {
    id: 16,
    questionNo: 'Q16',
    type: 'MCQ',
    title: 'Time complexity of loop inside loop',
    difficulty: 'Medium',
    marksObtained: 1,
    totalMarks: 1,
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    selectedOption: 2,
    correctOption: 2,
  },

  {
    id: 17,
    questionNo: 'Q17',
    type: 'CODING',
    title: 'Find minimum element',
    difficulty: 'Easy',
    marksObtained: 3,
    totalMarks: 5,
    language: 'Python',
    code: `def min_el(a):
  return min(a)`,
    testPassed: 3,
    testTotal: 5,
  },

  {
    id: 18,
    questionNo: 'Q18',
    type: 'MCQ',
    title: 'Which is immutable?',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['list', 'set', 'dict', 'tuple'],
    selectedOption: 3,
    correctOption: 3,
  },

  {
    id: 19,
    questionNo: 'Q19',
    type: 'CODING',
    title: 'Count vowels in string',
    difficulty: 'Medium',
    marksObtained: 4,
    totalMarks: 10,
    language: 'Python',
    code: `def count_vowels(s):
  return sum(c in 'aeiou' for c in s.lower())`,
    testPassed: 4,
    testTotal: 10,
  },

  {
    id: 20,
    questionNo: 'Q20',
    type: 'MCQ',
    title: 'Index starts from?',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['0', '1', '-1', 'Depends'],
    selectedOption: 0,
    correctOption: 0,
  },

  {
    id: 21,
    questionNo: 'Q21',
    type: 'CODING',
    title: 'Merge two arrays',
    difficulty: 'Hard',
    marksObtained: 2,
    totalMarks: 10,
    language: 'Python',
    code: `def merge(a,b):
  return sorted(a+b)`,
    testPassed: 2,
    testTotal: 10,
  },

  {
    id: 22,
    questionNo: 'Q22',
    type: 'MCQ',
    title: 'Which loop runs at least once?',
    difficulty: 'Medium',
    marksObtained: 0,
    totalMarks: 1,
    options: ['for', 'while', 'do-while', 'foreach'],
    selectedOption: 1,
    correctOption: 2,
  },

  {
    id: 23,
    questionNo: 'Q23',
    type: 'CODING',
    title: 'Find duplicate in array',
    difficulty: 'Hard',
    marksObtained: 0,
    totalMarks: 10,
    language: 'Python',
    code: `def find_dup(a):
  return None`,
    testPassed: 0,
    testTotal: 10,
  },

  {
    id: 24,
    questionNo: 'Q24',
    type: 'MCQ',
    title: 'Which is NOT a data type?',
    difficulty: 'Easy',
    marksObtained: 1,
    totalMarks: 1,
    options: ['int', 'float', 'double', 'str'],
    selectedOption: 2,
    correctOption: 2,
  },

  {
    id: 25,
    questionNo: 'Q25',
    type: 'CODING',
    title: 'Check prime number',
    difficulty: 'Medium',
    marksObtained: 8,
    totalMarks: 10,
    language: 'Python',
    code: `def is_prime(n):
  if n<2: return False
  for i in range(2,int(n**0.5)+1):
    if n%i==0: return False
  return True`,
    testPassed: 8,
    testTotal: 10,
  },
];
