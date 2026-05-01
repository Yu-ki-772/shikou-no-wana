"use client";

import { useState, useEffect } from "react";
import type { Question } from "@/types";
import { isTrapped } from "@/lib/result";
import ScreenLayout from "@/components/ScreenLayout";

type Props = {
  question: Question;
  selectedChoiceId: string;
  isLast: boolean;
  onNext: () => void;
};

const ExplanationScreen = ({
  question,
  selectedChoiceId,
  isLast,
  onNext,
}: Props) => {
  const selectedChoice = question.choices.find((c) => c.id === selectedChoiceId);
  const trapped = isTrapped(selectedChoice?.result);

  // 判定結果に応じた配色クラス
  const resultBorderBg = trapped
    ? "border-trapped-border bg-trapped-bg"
    : "border-calm-border bg-calm-bg";
  const resultTextColor = trapped ? "text-trapped-text" : "text-calm-text";

  // 判定オーバーレイの表示状態
  const [showOverlay, setShowOverlay] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1200ms後にフェードアウト開始、500ms後に非表示
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    const hideTimer = setTimeout(() => setShowOverlay(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* 判定オーバーレイ */}
      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          } ${trapped ? "bg-trapped-bg" : "bg-calm-bg"}`}
        >
          <p
            className={`font-serif-jp text-4xl font-bold text-center px-8 ${resultTextColor}`}
          >
            {trapped ? "思考の罠に\nかかった！" : "冷静な判断"}
          </p>
        </div>
      )}

      <ScreenLayout>
        {/* 判定バナー */}
        <div className={`rounded-lg px-5 py-4 mb-8 border ${resultBorderBg}`}>
          <p className={`text-xl font-bold font-sans ${resultTextColor}`}>
            {trapped ? "思考の罠にかかった！" : "冷静な判断"}
          </p>
        </div>

        {/* 見出し */}
        <div className="mb-8 border-b border-border pb-6">
          <p className="text-lg font-sans text-text-muted tracking-widest uppercase mb-2">
            解説
          </p>
          <h2 className="font-serif-jp text-4xl font-bold text-text-primary">
            {question.lesson}
          </h2>
        </div>

        <div className="flex flex-col flex-1 justify-between gap-8">
          <div className="space-y-6">
            {/* 問題文の再掲 */}
            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-sans text-text-muted mb-3 tracking-wide">問題</p>
              <p className="font-serif-jp text-base text-text-primary leading-loose whitespace-pre-line">
                {question.questionText}
              </p>
            </div>

            {/* 選択結果 */}
            <div className={`px-5 py-4 rounded-lg border ${resultBorderBg}`}>
              <p className="text-sm font-sans text-text-muted mb-2 tracking-wide">
                あなたの選択
              </p>
              <p className="text-sm font-sans text-text-primary mb-2">
                <span className={`font-bold mr-2 ${resultTextColor}`}>
                  {selectedChoiceId}.
                </span>
                {selectedChoice?.label}
              </p>
            </div>

            {/* 解説文 */}
            <div className="space-y-2">
              <p className="text-sm font-sans text-text-muted tracking-widest uppercase">
                説明
              </p>
              <p className="font-serif-jp text-base text-text-primary leading-loose">
                {question.explanation}
              </p>
            </div>
          </div>

          {/* 次へボタン */}
          <div className="pb-8">
            <button
              onClick={onNext}
              className="w-full py-4 bg-accent text-white font-sans font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-150 text-base"
            >
              {isLast ? "結果を見る" : "次の問題へ"}
            </button>
          </div>
        </div>
      </ScreenLayout>
    </>
  );
};

export default ExplanationScreen;