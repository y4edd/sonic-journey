import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ArtistFavoriteButton from "./ArtistFavoriteButton";

jest.mock("@/utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteArtistsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ artistId: 7878479, updatedAt: new Date() }],
  })),
}));

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ArtistFavoriteButtonコンポーネントのテスト", () => {
  test("propsを受け取り、コンポーネントが画面に表示される", () => {
    render(<ArtistFavoriteButton id={88} />);
    const button = screen.getByRole("button", { name: "お気に入りに追加" });
    expect(button).toBeInTheDocument();
  });

  test("ボタン押下でお気に入りに追加され、表示が切り替わる", async() => {
    render(<ArtistFavoriteButton id={88} />);

    const button = screen.getByRole("button", { name: "お気に入りに追加" });
    fireEvent.click(button);

    await waitFor(() => {
      const addedButton = screen.getByRole("button", { name: "お気に入りに追加済み"});
      expect(addedButton).toBeInTheDocument();
    });
  })

  test("すでにお気に入りだった場合、「お気に入りに追加済み」が画面上に表示されている", async () => {
    render(<ArtistFavoriteButton id={7878479} />);

    await waitFor(() =>{
      const button = screen.getByRole("button", {name: "お気に入りに追加済み"});
      expect(button).toBeInTheDocument();
    });
  });

  test("お気に入り済みのボタンについて、再押下で表示が切り替わる", async () => {
    render(<ArtistFavoriteButton id={7878479} />);

    await waitFor( async () => {
      const addedButton = screen.getByRole("button", {name: "お気に入りに追加済み"});

      fireEvent.click(addedButton);

      await waitFor(() => {
        const notAddButton = screen.getByRole("button", {name: "お気に入りに追加済み"});
        expect(notAddButton).toBeInTheDocument; 
      });
    });
  });
});
