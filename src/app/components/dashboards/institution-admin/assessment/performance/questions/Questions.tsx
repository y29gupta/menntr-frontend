import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import QuestionModal from './QuuestonModal';

type Question = {
  id: string;
  question: string;
  mandatory: boolean;
  marks: number;
  subject: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  // MCQ fields
  options?: string[];
  correctAnswer?: number;
  // Coding Question fields
  problemStatement?: string;
  testCasesPassed?: string;
  executionTime?: string;
  // Descriptive fields
  descriptiveAnswer?: string;
  wordLimit?: number;
};

const QUESTIONS: Question[] = [
  {
    id: '1',
    question:
      'If the ratio of boys to girls in a class is 3 : 2 and there are 15 boys, how many girls are there in the class?',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Easy',
    options: ['10 girls', '12 girls', '15 girls', '20 girls'],
    correctAnswer: 0,
  },
  {
    id: '2',
    question:
      'If a train travels 180 km at a constant speed and returns over the same distance at a speed that is 20 km/h less, what is the average speed?',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Medium',
    options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
    correctAnswer: 1,
  },
  {
    id: '3',
    question:
      'A train travels 180 km at a constant speed and returns over the same distance at a speed that is 20 km/h less. Find the original speed.',
    mandatory: true,
    marks: 1,
    subject: 'Quantitative Aptitude',
    type: 'MCQ - Single correct answer',
    difficulty: 'Hard',
    options: ['60 km/h', '80 km/h', '100 km/h', '120 km/h'],
    correctAnswer: 2,
  },
  {
    id: '4',
    question: 'What is the time complexity of binary search in a sorted array?',
    mandatory: false,
    marks: 2,
    subject: 'Data Structures',
    type: 'MCQ - Single correct answer',
    difficulty: 'Easy',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1,
  },
  {
    id: '5',
    question: 'Which data structure is used to implement recursion internally?',
    mandatory: true,
    marks: 2,
    subject: 'Data Structures',
    type: 'MCQ - Single correct answer',
    difficulty: 'Medium',
    options: ['Queue', 'Stack', 'Heap', 'Tree'],
    correctAnswer: 1,
  },
  {
    id: '6',
    question: 'Given an array of integers, find the maximum subarray sum using Kadanes algorithm.',
    mandatory: true,
    marks: 3,
    subject: 'Algorithms',
    type: 'Coding Question',
    difficulty: 'Hard',
    problemStatement:
      "Implement Kadane's algorithm to find the maximum sum of a contiguous subarray within a one-dimensional array of numbers.",
    testCasesPassed: '10 / 10',
    executionTime: '1.2s',
  },
  {
    id: '7',
    question:
      'What will be the output of the following code snippet involving closures in JavaScript?',
    mandatory: false,
    marks: 2,
    subject: 'JavaScript',
    type: 'MCQ - Single correct answer',
    difficulty: 'Medium',
    options: ['undefined', '0', '5', 'Error'],
    correctAnswer: 2,
  },
  {
    id: '8',
    question: 'Write a program to check whether a given number is a palindrome.',
    mandatory: true,
    marks: 2,
    subject: 'Programming Basics',
    type: 'Coding Question',
    difficulty: 'Easy',
    problemStatement:
      'Write a function that takes a number as input and returns true if it is a palindrome, false otherwise.',
    testCasesPassed: '8 / 10',
    executionTime: '0.8s',
  },
  {
    id: '9',
    question: 'Explain the difference between REST and GraphQL APIs.',
    mandatory: false,
    marks: 3,
    subject: 'Web Development',
    type: 'Descriptive',
    difficulty: 'Medium',
    descriptiveAnswer: '',
    wordLimit: 300,
  },
  {
    id: '10',
    question: 'Design a database schema for a simple chat application.',
    mandatory: true,
    marks: 5,
    subject: 'System Design',
    type: 'Coding Question',
    difficulty: 'Hard',
    problemStatement:
      'Create a database schema that supports users, conversations, messages, and message status (sent, delivered, read).',
    testCasesPassed: '15 / 15',
    executionTime: '2.1s',
  },
];

const DIFFICULTY_STYLES: Record<Question['difficulty'], string> = {
  Easy: 'bg-[#ECFDF3] text-[#027A48]',
  Medium: 'bg-[#FFFAEB] text-[#8E6100]',
  Hard: 'bg-[#FFE6E6] text-[#8E0000]',
};

function getModalContent(question: Question, index: number) {
  const title = `Q${index + 1}: ${question.question}`;
  const metadata = `${question.subject} | ${question.type} | ${question.mandatory ? 'Mandatory' : 'Optional'}`;

  // For MCQ questions
  if (question.type === 'MCQ - Single correct answer' && question.options) {
    return {
      title,
      metadata,
      sections: [
        {
          title: 'Options',
          content: (
            <div className="space-y-2 sm:space-y-3">
              {question.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <span className="text-[#101828]">Option {idx + 1}</span>
                  {idx === question.correctAnswer && (
                    <span className="w-fit rounded bg-[#ECFDF3] px-2.5 py-1 text-xs sm:text-sm font-medium text-[#027A48]">
                      Correct Answer
                    </span>
                  )}
                </div>
              ))}
            </div>
          ),
        },
        {
          title: 'Marks',
          content: (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <div className="flex-1">
                <p className="text-base sm:text-lg font-semibold text-[#101828]">Marks</p>
                <p className="mt-1 text-sm sm:text-base text-[#667085]">{question.marks} Mark</p>
              </div>
              <div className="hidden sm:block h-auto w-px bg-[#EAECF0]"></div>
              <div className="flex-1 sm:pl-8 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#EAECF0]">
                <p className="text-base sm:text-lg font-semibold text-[#101828]">Difficulty</p>
                <p className="mt-1 text-sm sm:text-base text-[#667085]">{question.difficulty}</p>
              </div>
            </div>
          ),
        },
      ],
    };
  }

  // For Coding questions
  if (question.type === 'Coding Question') {
    return {
      title,
      metadata,
      sections: [
        {
          title: 'Problem Statement',
          content: (
            <div className="text-xs sm:text-sm text-[#667085] break-words">
              {question.problemStatement ||
                'Write the full problem statement here. Describe the task clearly with context.'}
            </div>
          ),
        },
        {
          title: 'Test cases',
          content: (
            <div className="space-y-2 text-sm sm:text-base text-[#667085]">
              <p className="break-words">
                Test Cases Passed:{' '}
                <span className="text-[#101828]">{question.testCasesPassed}</span>
              </p>
              <p className="break-words">
                Execution Time: <span className="text-[#101828]">{question.executionTime}</span>
              </p>
            </div>
          ),
        },
      ],
    };
  }

  // Default fallback
  return {
    title,
    metadata,
    sections: [],
  };
}

function Questions() {
  const [selectedQuestion, setSelectedQuestion] = useState<{
    question: Question;
    index: number;
  } | null>(null);
  return (
    <>
      <div className="space-y-4">
        {QUESTIONS.map((q, index) => (
          <div
            key={q.id}
            className="flex cursor-pointer"
            onClick={() => setSelectedQuestion({ question: q, index })}
          >
            {/* Drag handle */}
            <div className="flex items-center rounded-l-xl bg-[#F0F2F7] px-2">
              <GripVertical size={18} className="shrink-0 text-[#98A2B3]" />
            </div>

            {/* Question card */}
            <div className="flex w-full flex-col rounded-r-xl border border-[#EAECF0] p-2 sm:flex-row">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <p className="text-sm font-medium text-[#101828] break-words">
                    Q{index + 1}: {q.question}
                  </p>
                  {q.mandatory && (
                    <span className="text-sm text-[#667085] whitespace-nowrap">Mandatory</span>
                  )}
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#667085]">
                    {q.marks} Mark | {q.subject} | {q.type}
                  </p>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${DIFFICULTY_STYLES[q.difficulty]}`}
                    >
                      {q.difficulty}
                    </span>
                    <Trash2 size={16} className="text-[#636771]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedQuestion && (
        <QuestionModal
          isOpen={!!selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          {...getModalContent(selectedQuestion.question, selectedQuestion.index)}
        />
      )}
    </>
  );
}

export default Questions;
