import type { Question } from "@/types";
import ScreenLayout from "@/components/ScreenLayout";

type Props = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  isFirst: boolean;
  onAnswer: (choiceId: string) => void;
};

const QuestionScreen = ({
  question,
  questionNumber,
  totalQuestions,
  isFirst,
  onAnswer,
}: Props) => {
  return (
    <ScreenLayout>
      {/* 進捗 */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-sans text-text-muted tracking-widest">
            第{questionNumber}問
          </p>
          <p className="text-sm font-sans text-text-muted">
            {questionNumber} / {totalQuestions}
          </p>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col flex-1 gap-5">
        <div className="space-y-6">
          {isFirst && (
            <p className="text-sm font-sans text-accent tracking-wide">
              ※ 直感で答えてください
            </p>
          )}

          {/* 問題文 */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <p className="font-serif-jp text-base leading-loose text-text-primary whitespace-pre-line">
              {question.questionText}
            </p>
          </div>
        </div>

        {/* 選択肢 */}
        <div className="space-y-3 pb-8">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onAnswer(choice.id)}
              className="w-full text-left px-5 py-4 bg-surface border border-border rounded-lg text-sm font-sans text-text-primary leading-snug hover:border-accent hover:bg-accent-muted active:scale-[0.99] transition-all duration-150"
            >
              <span className="font-bold text-accent mr-3">{choice.id}.</span>
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default QuestionScreen;