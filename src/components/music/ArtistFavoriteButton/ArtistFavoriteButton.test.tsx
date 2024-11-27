import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ArtistFavoriteButton from "./ArtistFavoriteButton";

jest.mock("../../../utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteArtistsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ artistId: 7878479, updatedAt: new Date() }],
  })),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ArtistFavoriteButtonコンポーネントのテスト", () => {
  test("コンポーネントがpropsを受け取り、画面に表示される", () => {
    render(<ArtistFavoriteButton id={88} />);
    const button = screen.getByRole("button", { name: "お気に入りに追加" });
    expect(button).toBeInTheDocument();
  });
});
