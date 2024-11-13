import { HISTORY } from "@/constants/constant";
import { render, screen } from "@testing-library/react";
import PlayHistory from "./PlayHistory";

describe("PlayHistoryコンポーネントの単体テスト", () => {
  beforeEach(() => {
    render(<PlayHistory />);
  });
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    HISTORY.map((song: { id: number; image: string; title: string; artist: string }) => {
      expect(screen.getByText(song.title)).toBeInTheDocument();
    });
  });

  test("指定された件数履歴が表示できていること", () => {
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  // FIXME: 視聴履歴がなかった場合のテストを処理を追加したら記載する
});
