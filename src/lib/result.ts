import type { Answer, ChoiceResult } from "@/types";
import { QUESTIONS } from "@/lib/questions";

// 回答済みの選択肢から ChoiceResult を問題データ経由で導出
export function getChoiceResult(
  answers: Answer[],
  questionId: string
): ChoiceResult | undefined {
  const question = QUESTIONS.find((q) => q.id === questionId);
  const answer = answers.find((a) => a.questionId === questionId);
  return question?.choices.find((c) => c.id === answer?.choiceId)?.result;
}

export function isTrapped(result: ChoiceResult | undefined): boolean {
  return result === "trapped";
}