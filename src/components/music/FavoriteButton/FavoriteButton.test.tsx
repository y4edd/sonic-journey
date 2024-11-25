import { fireEvent, render, screen } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";

describe("FavoriteButtonコンポーネントのテスト", () => {
  test("idが渡されたとき、ボタンが表示される", () => {
    render(<FavoriteButton id={38384836} />);
    const element = screen.getByText("お気に入りに追加");
    expect(element).toBeInTheDocument();
  });
});
