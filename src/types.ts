export type ScenarioId =
  | "cinema"
  | "eiffel"
  | "yoga"
  | "coin_toss"
  | "cafe";

export type ChoiceResult = "trapped" | "calm";

export type Choice = {
  id: string;
  label: string;
  result: ChoiceResult;
};

export type Question = {
  id: ScenarioId;
  scenarioTitle: string;
  lesson: string;
  questionText: string;
  choices: Choice[];
  explanation: string;
};

export type Answer = {
  questionId: ScenarioId;
  choiceId: string;
};

export type Screen = "title" | "question" | "explanation" | "summary";