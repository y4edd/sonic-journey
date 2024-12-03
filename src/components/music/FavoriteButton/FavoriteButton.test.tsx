import { render, screen, waitFor } from "@testing-library/react";
import FavoriteButton from "./FavoriteButton";
import userEvent from "@testing-library/user-event";

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

  test("すでにお気に入りだった場合、「お気に入りに追加済み」が画面上に表示されている", async () => {
    render(<FavoriteButton id={78787878} />);

    await waitFor(() => {
      const button = screen.getByRole("button", { name: "お気に入りに追加済み" });
      expect(button).toBeInTheDocument();
    });
  });

  test("お気に入り済みのボタンについて、再押下で表示が切り替わる", async () => {
    render(<FavoriteButton id={78787878} />);

    await waitFor(async () => {
      const addedButton = screen.getByRole("button", { name: "お気に入りに追加済み" });

      userEvent.click(addedButton);

      await waitFor(() => {
        const notAddButton = screen.getByRole("button", { name: "お気に入りに追加済み" });
        expect(notAddButton).toBeInTheDocument;
      });
    });
  });
});
