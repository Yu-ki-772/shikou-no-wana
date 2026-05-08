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
  // 状態管理
  const [screen, setScreen] = useState<Screen>("title");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 現在の問題
  const currentQuestion = QUESTIONS[currentIndex];
  // 最後の問題かどうか
  const isLast = currentIndex === QUESTIONS.length - 1;

  // スタート画面から問題画面へ遷移
  const handleStart = () => setScreen("question");

  // 回答を記録して解説画面へ遷移
  const handleAnswer = (choiceId: string) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      choiceId,
    };
    setAnswers((prev) => [...prev, answer]);
    setScreen("explanation");
  };

  // 次の問題または結果画面へ遷移
  const handleNext = () => {
    if (isLast) {
      setScreen("summary");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setScreen("question");
    }
  };

  // Xへシェア
  const handleShare = () => shareToX(answers);

  // 最初からやり直す
  const handleRestart = () => {
    setScreen("title");
    setCurrentIndex(0);
    setAnswers([]);
  };

  // 画面の切り替え
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