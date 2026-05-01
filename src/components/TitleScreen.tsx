import ScreenLayout from "@/components/ScreenLayout";

type Props = {
  onStart: () => void;
};

const TitleScreen = ({ onStart }: Props) => {
  return (
    <ScreenLayout className="py-16">
      <div className="flex-1 flex flex-col justify-center gap-12">
        {/* タイトル */}
        <div className="border-b border-border pb-8">
          <h1 className="font-serif-jp text-7xl font-bold text-text-primary leading-tight">
            思考の罠
          </h1>
          <p className="mt-4 text-lg text-text-muted font-sans leading-relaxed">
            あなたの判断は、本当に「あなた」のものか。
          </p>
        </div>

        {/* アプリ説明 */}
        <div className="space-y-6">
          <p className="text-base font-sans text-text-primary leading-loose">
            5つの問いを通じて、判断に潜む思考の罠を体験します。
            問題に答えたあとに解説が出てきます。
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-lg p-4 flex items-baseline justify-center gap-1">
              <p className="font-serif-jp text-4xl font-bold text-gray-700">5</p>
              <p className="text-lg text-text-muted font-sans">問</p>
            </div>
          </div>
        </div>

        {/* ボタン */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-accent text-white text-lg font-sans font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-150"
        >
          はじめる
        </button>
      </div>

      {/* アプリに関する補足 */}
      <p className="text-base text-text-muted font-sans leading-relaxed mt-8 border-t border-border pt-6">
        本アプリは判断の偏りを体験できるエンターテイメントコンテンツです。
      </p>
    </ScreenLayout>
  );
};

export default TitleScreen;