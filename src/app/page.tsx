"use client";

import { useState, useCallback } from "react";
import type { Answer, Screen } from "@/types";
import { QUESTIONS } from "@/lib/questions";
import { shareToX } from "@/lib/share";

import TitleScreen from "@/components/TitleScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ExplanationScreen from "@/components/ExplanationScreen";
import SummaryScreen from "@/components/SummaryScreen";

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("title");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 現在の問題
  const currentQuestion = QUESTIONS[currentIndex];
  // 最終問題
  const isLast = currentIndex === QUESTIONS.length - 1;

  const handleStart = () => setScreen("question");

  // 回答を記録して解説画面へ遷移
  const handleAnswer = useCallback(
    (choiceId: string) => {
      const answer: Answer = {
        questionId: currentQuestion.id,
        choiceId,
      };
      setAnswers((prev) => [...prev, answer]);
      setScreen("explanation");
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (isLast) {
      setScreen("summary");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setScreen("question");
    }
  }, [isLast]);

  const handleShare = useCallback(() => {
    shareToX(answers);
  }, [answers]);

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
      );
      // 回答が存在しない場合は何も表示しない
      if (!currentAnswer) return null;

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