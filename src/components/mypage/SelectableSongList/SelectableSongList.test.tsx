import type { DeezerSong } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SelectableSongList from "./SelectableSongList";

const mockSong: DeezerSong = {
  id: 111,
  title: "分針を噛む",
  cover_xl: "example.jpg",
  release_date: "2024-10-17",
  artist: {
    id: 222,
    name: "ずっと真昼でいいのに",
  },
  album: {
    id: 333,
    title: "誤った真実からの就寝",
  },
};

describe("SelectableSongListコンポーネントのテスト", () => {
  const mockFn = jest.fn();

  test("楽曲がない場合、メッセージを表示すること", () => {
    render(
      <SelectableSongList
        songs={[]}
        selectedSongs={[]}
        onChange={mockFn}
        errorMessage="お気に入り曲は登録されていません"
      />,
    );
    expect(screen.getByText("お気に入り曲は登録されていません")).toBeInTheDocument();
  });

  test("楽曲が1つある場合、1つのSongListItemを表示すること", () => {
    render(
      <SelectableSongList
        songs={[mockSong]}
        selectedSongs={[]}
        onChange={mockFn}
        errorMessage="お気に入り曲は登録されていません"
      />,
    );
    expect(screen.getByText("分針を噛む")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "111");
  });

  test("複数の楽曲がある場合、複数のSongListItemを表示する", () => {
    const songs = [mockSong, { ...mockSong, id: 555, title: "勘鈍くて悔しいわ" }];
    render(
      <SelectableSongList
        songs={songs}
        selectedSongs={[]}
        onChange={mockFn}
        errorMessage="お気に入り曲は登録されていません"
      />,
    );

    expect(screen.getByText("分針を噛む")).toBeInTheDocument();
    expect(screen.getByText("勘鈍くて悔しいわ")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const links = screen.getAllByRole("checkbox");
    expect(links[0]).toHaveAttribute("value", "111");
    expect(links[1]).toHaveAttribute("value", "555");
  });
});
