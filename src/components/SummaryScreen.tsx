import type { Answer, Question } from "@/types";
import { getChoiceResult, isTrapped } from "@/lib/result";
import ScreenLayout from "@/components/ScreenLayout";

type Props = {
  answers: Answer[];
  questions: Question[];
  onShare: () => void;
  onRestart: () => void;
};

const SummaryScreen = ({ answers, questions, onShare, onRestart }: Props) => {
  // 罠にかかった問題数を集計
  const trappedCount = questions.filter((question) =>
    isTrapped(getChoiceResult(answers, question.id))
  ).length;

  return (
    <ScreenLayout>
      {/* ヘッダー */}
      <div className="border-b border-border pb-8 mb-8">
        <h2 className="font-serif-jp text-3xl font-bold text-text-primary">
          結果
        </h2>
      </div>

      {/* 集計 */}
      <div className="bg-surface border border-border rounded-lg p-6 mb-8 text-center">
        <p className="font-serif-jp text-6xl font-bold text-trapped-text mb-2">
          {trappedCount}
          <span className="text-3xl text-text-muted font-normal"> /{questions.length}</span>
        </p>
        <p className="text-lg font-sans text-text-muted">
          {questions.length}問中{trappedCount}問で思考の罠にかかりました！
        </p>
      </div>

      {/* シナリオ別結果 */}
      <div className="space-y-2 mb-10">
        {questions.map((question) => {
          const trapped = isTrapped(getChoiceResult(answers, question.id));
          return (
            <div
              key={question.id}
              className={`flex items-center justify-between px-5 py-3.5 rounded-lg border ${
                trapped
                  ? "border-trapped-border bg-trapped-bg"
                  : "border-calm-border bg-calm-bg"
              }`}
            >
              <span className="font-serif-jp text-base text-text-primary">
                {question.scenarioTitle}
              </span>
              <span
                className={`text-sm font-semibold font-sans ${
                  trapped ? "text-trapped-text" : "text-calm-text"
                }`}
              >
                {trapped ? "罠にかかった！" : "冷静な判断"}
              </span>
            </div>
          );
        })}
      </div>

      {/* ボタン群 */}
      <div className="space-y-3 mt-auto pb-8">
        <button
          onClick={onShare}
          className="w-full py-4 bg-black text-white font-sans font-semibold rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-150 text-base flex items-center justify-center gap-2"
        >
          <span>Xで結果をシェア</span>
        </button>
        <button
          onClick={onRestart}
          className="w-full py-4 bg-surface border border-border text-text-muted font-sans text-sm rounded-lg hover:border-accent hover:text-accent active:scale-95 transition-all duration-150"
        >
          もう一度挑戦する
        </button>
      </div>
    </ScreenLayout>
  );
};

export default SummaryScreen;