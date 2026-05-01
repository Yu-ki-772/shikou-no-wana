import type { Answer } from "@/types";
import { QUESTIONS } from "@/lib/questions";
import { getChoiceResult, isTrapped } from "@/lib/result";

export function buildShareText(answers: Answer[]): string {
  const trappedCount = QUESTIONS.filter((q) =>
    isTrapped(getChoiceResult(answers, q.id))
  ).length;

  return [
    "「思考の罠」をプレイしました！",
    "",
    `${QUESTIONS.length}問中${trappedCount}問で思考の罠にかかった！`,
    "",
    "https://shikou-no-wana.vercel.app",
  ].join("\n");
}

export function shareToX(answers: Answer[]): void {
  const text = buildShareText(answers);
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}