import type { DeezerArtist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SelectableArtistList from "./SelectableArtistList";

const mockArtist: DeezerArtist = {
  id: 111,
  name: "ヒルシカ",
  picture_xl: "example.jpg",
};

describe("SelectableArtistListコンポーネントのテスト", () => {
  const mockFn = jest.fn();

  test("アーティストがない場合、エラーメッセージを表示すること", () => {
    render(
      <SelectableArtistList
        artists={[]}
        selectedArtists={[]}
        onChange={mockFn}
        errorMessage="お気に入りアーティストは登録されていません"
      />,
    );
    expect(screen.getByText("お気に入りアーティストは登録されていません")).toBeInTheDocument();
  });

    test("アーティストが1つある場合、1つのArtistListItemを表示すること", () => {
    render(
      <SelectableArtistList
        artists={[mockArtist]}
        selectedArtists={[]}
        onChange={mockFn}
        errorMessage="お気に入りアーティストは登録されていません"
      />,
    );
    expect(screen.getByText("ヒルシカ")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "111");
  });

  test("アーティストが複数ある場合、複数ののArtistListItemを表示すること", () => {
    const artists = [mockArtist, { ...mockArtist, id: 222, name: "ずっと真昼でいいのに" }];
    render(
      <SelectableArtistList
        artists={artists}
        selectedArtists={[]}
        onChange={mockFn}
        errorMessage="お気に入りアーティストは登録されていません"
      />,
    );

    expect(screen.getByText("ヒルシカ")).toBeInTheDocument();
    expect(screen.getByText("ずっと真昼でいいのに")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const links = screen.getAllByRole("checkbox");
    expect(links[0]).toHaveAttribute("value", "111");
    expect(links[1]).toHaveAttribute("value", "222");
  });
});
