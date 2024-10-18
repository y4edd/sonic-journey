import type { DeezerSong } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SongListItem from "./SongListItem";

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

describe("SongListItemコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SongListItem song={mockSong} />);

    const imgElement = screen.getByAltText("分針を噛むのジャケット画像");

    expect(screen.getByText("分針を噛む")).toBeInTheDocument();
    expect(screen.getByText("ずっと真昼でいいのに")).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockSong.cover_xl);
  });
});
