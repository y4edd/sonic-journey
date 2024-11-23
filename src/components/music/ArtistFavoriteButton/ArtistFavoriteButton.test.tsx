import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ArtistFavoriteButton from "./ArtistFavoriteButton";

const apiMock =jest.fn();

describe("ArtistFavoriteButtonコンポーネントのテスト", () => {
  test("コンポーネントがpropsを受け取り、画面に表示される", () => {
    render(<ArtistFavoriteButton id={88} />);
    const button = screen.getByRole("button", {name: "お気に入りに追加"});
    expect(button).toBeInTheDocument();
  });

  test("非同期処理が完了したとき、アラートが表示される", async () => {
    apiMock.mockResolvedValue({message: "お気に入りアーティストに追加されました" });
    window.alert = jest.fn();
    render(<ArtistFavoriteButton id={88} />);

    const button = screen.getByRole("button", {name: "お気に入りに追加"});

    fireEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("お気に入りアーティストに追加されました");
    });
  });
});
