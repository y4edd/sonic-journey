import { fireEvent, render, screen } from "@testing-library/react";
import GenreButton from "./GenreButton";

describe("GenreButtonコンポーネントの単体テスト", () => {
  const mockSetSelectGenre = jest.fn();
  const mockData = { id: 0, name: "すべて", picture: "allGenre.png" };
  test("レンダリングが適切に行われていること", () => {
    render(<GenreButton genre={mockData} selectGenre={1} setSelectGenre={mockSetSelectGenre} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("押下していないボタンが灰色であること", () => {
    render(<GenreButton genre={mockData} selectGenre={1} setSelectGenre={mockSetSelectGenre} />);
    expect(screen.getByRole("button")).toHaveClass("genreBtn");
  });
  test("押下したボタンが黄緑色になること", () => {
    render(<GenreButton genre={mockData} selectGenre={0} setSelectGenre={mockSetSelectGenre} />);
    expect(screen.getByRole("button")).toHaveClass("selectGenreBtn");
  });
});
