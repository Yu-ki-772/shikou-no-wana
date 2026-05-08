"use client";

import { useState } from "react";
import type { Answer, Screen } from "@/types";
import { QUESTIONS } from "@/lib/questions";
import { shareToX } from "@/lib/share";

import TitleScreen from "@/components/TitleScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ExplanationScreen from "@/components/ExplanationScreen";
import SummaryScreen from "@/components/SummaryScreen";

export default function Main() {
  const [screen, setScreen] = useState<Screen>("title");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = QUESTIONS[currentIndex];
  const isLast = currentIndex === QUESTIONS.length - 1;

  const handleStart = () => setScreen("question");

  const handleAnswer = (choiceId: string) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      choiceId,
    };
    setAnswers((prev) => [...prev, answer]);
    setScreen("explanation");
  };

  const handleNext = () => {
    if (isLast) {
      setScreen("summary");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setScreen("question");
    }
  };

  const handleShare = () => shareToX(answers);

  const handleRestart = () => {
    setScreen("title");
    setCurrentIndex(0);
    setAnswers([]);
  };

  switch (screen) {
    case "title":
      return <TitleScreen onStart={handleStart} />;

    case "question":
      return (
        <QuestionScreen
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={QUESTIONS.length}
          isFirst={currentIndex === 0}
          onAnswer={handleAnswer}
        />
      );

    case "explanation": {
      const currentAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
      )!;

      return (
        <ExplanationScreen
          question={currentQuestion}
          selectedChoiceId={currentAnswer.choiceId}
          isLast={isLast}
          onNext={handleNext}
        />
      );
    }

    case "summary":
      return (
        <SummaryScreen
          answers={answers}
          questions={QUESTIONS}
          onShare={handleShare}
          onRestart={handleRestart}
        />
      );
  }
}