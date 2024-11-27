import { render, screen } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";

jest.mock("../../../utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteSongsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ songId: 7878479, updatedAt: new Date() }],
  })),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe("FavoriteButtonコンポーネントのテスト", () => {
  test("idが渡されたとき、ボタンが表示される", () => {
    render(<FavoriteButton id={38384836} />);
    const element = screen.getByText("お気に入りに追加");
    expect(element).toBeInTheDocument();
  });
});
