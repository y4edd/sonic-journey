import type { DeezerArtist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import ArtistList from "./ArtistList";

const mockArtist: DeezerArtist = {
  id: 111,
  name: "ヒルシカ",
  picture_xl: "example.jpg",
};

describe("ArtistListコンポーネントのテスト", () => {
  test("アーティストが空の場合、エラーメッセージを表示すること", () => {
    render(<ArtistList artists={[]} errorMessage="お気に入りアーティストは登録されていません" />);
    expect(screen.getByText("お気に入りアーティストは登録されていません")).toBeInTheDocument();
  });

  test("アーティストが1つある場合、1つのArtistListItemを表示すること", () => {
    render(
      <ArtistList
        artists={[mockArtist]}
        errorMessage="お気に入りアーティストは登録されていません"
      />,
    );
    expect(screen.getByText("ヒルシカ")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  test("アーティストが複数ある場合、複数ののArtistListItemを表示すること", () => {
    const artists = [mockArtist, { ...mockArtist, id: 222, name: "ずっと真昼でいいのに" }];
    render(
      <ArtistList artists={artists} errorMessage="お気に入りアーティストは登録されていません" />,
    );

    expect(screen.getByText("ヒルシカ")).toBeInTheDocument();
    expect(screen.getByText("ずっと真昼でいいのに")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
