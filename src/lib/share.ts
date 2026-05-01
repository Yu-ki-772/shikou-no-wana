import type { Answer } from "@/types";
import { QUESTIONS } from "@/lib/questions";
import { getChoiceResult, isTrapped } from "@/lib/result";

export function buildShareText(answers: Answer[]): string {
  let trappedCount = 0;

  const resultLines = QUESTIONS.map((q) => {
    const trapped = isTrapped(getChoiceResult(answers, q.id));
    if (trapped) trappedCount++;
    return `・ ${q.scenarioTitle}：${trapped ? "罠にかかった" : "冷静な判断"}`;
  }).join("\n");

  return [
    "「思考の罠」をプレイしました！",
    "",
    resultLines,
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