// src/utils/questionType.ts

export type QuestionType = string;

export const normalizeTypes = (types?: QuestionType | QuestionType[]): QuestionType[] => {
  if (!types) return [];
  return Array.isArray(types) ? types : [types];
};

export const hasType = (types: QuestionType | QuestionType[] | undefined, type: QuestionType) => {
  return normalizeTypes(types).includes(type);
};

export const isMultiType = (types?: QuestionType | QuestionType[]) => {
  return normalizeTypes(types).length > 1;
};
