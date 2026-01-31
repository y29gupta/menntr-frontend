'use client';

import { useState } from 'react';
import QuestionsHeader from './questions/QuestionsHeader';
import Questions from './questions/Questions';

const dummyAssessmentData = {
  title: 'Questions',
  subtitle: 'Edit questions by clicking the cards',
  totalQuestions: 25,
  assessmentMeta: {
    category: 'MCQ and Coding',
    type: 'Manual',
    totalScore: 30,
    duration: '25 mins',
    scoreBreakdown: {
      MCQ: [
        { label: 'Single correct answer, Easy', count: 4 },
        { label: 'Single correct answer, Intermediate', count: 14 },
        { label: 'Single correct answer, Advance', count: 2 },
      ],
      Coding: [
        { label: 'Easy', count: 3 },
        { label: 'Intermediate', count: 3 },
        { label: 'Advance', count: 4 },
      ],
    },
  },
};

function QuestionsSection() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <QuestionsHeader
        title={dummyAssessmentData.title}
        subtitle={dummyAssessmentData.subtitle}
        totalQuestions={dummyAssessmentData.totalQuestions}
        assessmentMeta={dummyAssessmentData.assessmentMeta}
        search={search}
        onSearchChange={setSearch}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((p) => !p)}
        onSave={() => console.log('Save clicked')}
      />
      <Questions />
    </div>
  );
}

export default QuestionsSection;
