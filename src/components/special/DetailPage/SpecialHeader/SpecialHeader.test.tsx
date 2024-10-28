import { render, screen } from "@testing-library/react";
import { SpecialHeader } from "./SpecialHeader";

describe("specialHeaderコンポーネントの単体テスト", () => {
  const specialOverView = {
    id: 1,
    title: "ずとまよ特集",
    description: "ずとまよの特集です",
    image: "zutomayoSample.png",
  };
  test("レンダリングが行われ、適切に画像が表示される", () => {
    render(<SpecialHeader specialOverView={specialOverView} />);
    expect(screen.getAllByAltText("特集ページ見出し"));
  });
});
