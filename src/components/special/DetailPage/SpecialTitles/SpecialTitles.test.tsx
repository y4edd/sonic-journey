import { render, screen } from "@testing-library/react";
import { SpecialTitles } from "./SpecialTitles";

describe("SpecialTitlesコンポーネントの単体テスト", () => {
  test("コンポーネントレンダリング時に、特集ページタイトルと説明文を表示する", () => {
    const specialOverView = {
      id: 1,
      title: "特集タイトル",
      description: "説明文です",
      image: "sample.png",
    };
    render(<SpecialTitles specialOverView={specialOverView} />);
    expect(screen.getByText("特集タイトル")).toBeInTheDocument();
    expect(screen.getByText("説明文です")).toBeInTheDocument();
  });
});
