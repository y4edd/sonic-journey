import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "./FavoriteButton";

jest.mock("@/utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteSongsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ songId: 78787878, updatedAt: new Date() }],
  })),
}));

// アラートのモック化(jsdomでは未実装のため)
beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("FavoriteButtonコンポーネントのテスト", () => {
  test("idが渡されたとき、ボタンが表示される", () => {
    render(<FavoriteButton id={38383838} />);
    const element = screen.getByText("お気に入りに追加");
    expect(element).toBeInTheDocument();
  });

  test("ボタン押下でお気に入りに追加され、表示が切り替わる", async () => {
    render(<FavoriteButton id={38383838} />);

    const button = screen.getByRole("button", { name: "お気に入りに追加" });
    userEvent.click(button);

    await waitFor(() => {
      const addedButton = screen.getByRole("button", { name: "お気に入りに追加済み" });
      expect(addedButton).toBeInTheDocument();
    });
  });
});
