// 選択肢の判定結果
export type ChoiceResult = "trapped" | "calm";

// 各選択肢
export type Choice = {
  id: string;
  label: string;
  result: ChoiceResult;
};

// 問題
export type Question = {
  id: string;
  scenarioTitle: string;
  lesson: string;
  questionText: string;
  choices: Choice[];
  explanation: string;
};

// ユーザーの回答
export type Answer = {
  questionId: string;
  choiceId: string;
};

// どの画面を表示するかを管理するステート
export type Screen = "title" | "question" | "explanation" | "summary";