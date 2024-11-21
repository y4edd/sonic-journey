import { render, screen } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";

describe("FavoriteButtonコンポーネントのテスト", () => {
  test("propsとしてテキストを受け取り、レンダリングされること", () => {
    render(<FavoriteButton text={"テスト用"} />);
    const screenText = screen.getByText("テスト用");
    expect(screenText).toBeInTheDocument;
  });
})
