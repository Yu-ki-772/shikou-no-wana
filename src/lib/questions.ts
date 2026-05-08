import type { Question } from "@/types";

export const QUESTIONS = [
  {
    id: "cinema",
    scenarioTitle: "映画館のメニュー",
    lesson: "比較に流される思考",
    questionText:
      "あなたは映画館でポップコーン単品(500円)だけを買うつもりでカウンターに来ました。メニューを見ると、こんな選択肢があります。\n\nどれにしますか?",
    choices: [
      { id: "A", label: "ポップコーン単品 500円", result: "calm" },
      { id: "B", label: "ポップコーン＋ドリンク 750円", result: "trapped" },
      { id: "C", label: "ポップコーン＋ドリンク＋チョコ 780円", result: "trapped" },
    ],
    explanation:
      "BとCの差はたった30円。Bがあることで「30円でチョコまでつくC」がお得に見える――この錯覚を生むためにBは置かれていました。本来のニーズ(単品)を基準にせず、選択肢同士の関係性で判断してしまうと、想定外の出費につながります。",
  },
  {
    id: "eiffel",
    scenarioTitle: "エッフェル塔の高さ",
    lesson: "最初の数字に引っ張られる思考",
    questionText:
      "ふと、こんな質問が頭に浮かびました。\n「エッフェル塔の高さは、500メートルより高いだろうか?低いだろうか?」\n\n──少し考えてみてください。\n\n──……では、実際のところ何メートルくらいだと思いますか?",
    choices: [
      { id: "A", label: "約450m", result: "trapped" },
      { id: "B", label: "約400m", result: "trapped" },
      { id: "C", label: "約330m", result: "calm" },
    ],
    explanation:
      "エッフェル塔の高さは約330m。それでも「500」を先に見せられると、その数字に推定が引っ張られます。まったく無関係な数字でも、最初に目にした数値が判断の出発点になってしまう――こうした思考の罠は、日常のいたるところに潜んでいます。",
  },
  {
    id: "yoga",
    scenarioTitle: "ヨガ教室のジレンマ",
    lesson: "過去の投資に縛られる思考",
    questionText:
      "月謝1万円のヨガ教室に半年通いました(これまで投じた額は6万円)。最近、講師との相性が悪く、行くたびに気が重くなります。退会金はかかりません。\n\nどうしますか?",
    choices: [
      { id: "A", label: "ここまで続けたので、もう少し頑張る", result: "trapped" },
      { id: "B", label: "退会する", result: "calm" },
    ],
    explanation:
      "「ここまで続けたので」――この発想自体が罠です。すでに払った6万円は、続けても辞めても戻ってきません。本来、判断すべきは「これから先、続けることで得られる価値」だけのはず。それなのに過去の投資額に引きずられて損な選択を続けてしまう――仕事でも投資でも、撤退の判断を狂わせる思考の罠です。",
  },
  {
    id: "coin_toss",
    scenarioTitle: "コイントスの賭け",
    lesson: "失うことを恐れる思考",
    questionText:
      "コイントスをします。\n\n・表が出れば、あなたは20,000円もらえます\n・裏が出れば、あなたは10,000円失います\n\nこのゲームに参加しますか?",
    choices: [
      { id: "A", label: "参加する", result: "calm" },
      { id: "B", label: "参加しない", result: "trapped" },
    ],
    explanation:
      "このゲームの期待値は＋5,000円。期待値だけで見れば、参加した方が有利な賭けです。それでも「失うかも」という恐怖の方が強く、ためらう人が多いはず。得る喜びより、失う痛みの方がずっと強く感じられる――こうした感覚の偏りは、日常の判断を必要以上に保守的にしがちです。",
  },
  {
    id: "cafe",
    scenarioTitle: "カフェの観察",
    lesson: "イメージで確率を見誤る思考",
    questionText:
      "あるカフェで、隣の席の男性をふと観察しました。彼は分厚い専門書を熱心に読み、ノートに数式のようなものを書き込んでいます。\n\nこの男性として、より可能性が高いのはどちらでしょうか?",
    choices: [
      { id: "A", label: "彼は読書が趣味である", result: "calm" },
      { id: "B", label: "彼は読書が趣味で、休日は数学パズルにも取り組んでいる", result: "trapped" },
    ],
    explanation:
      "確率的にはAの方が高くなります。「読書が趣味で数学パズルもする人」は「読書が趣味の人」の一部にすぎないからです。それでも目の前の人物像(専門書・数式)に合うBを選びたくなる――典型的なイメージに判断を引っ張られると、論理的な確率を見落としてしまうことがあります。",
  },
] as const satisfies Question[];
// ScenarioId を QUESTIONS から自動導出するために as const でリテラル型を保持しつつ、
// satisfies で Question[] との型チェックも担保している

export type ScenarioId = typeof QUESTIONS[number]["id"];