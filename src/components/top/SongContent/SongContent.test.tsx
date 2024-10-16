import { type DeezerSong, DeezerNewSongDetail } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SongContent from "./SongContent";

const mockSong: DeezerSong = {
  id: 1,
  title: "シンデレラ",
  cover_xl: "example.jpg",
  release_date: "2024-10-15",
  artist: {
    id: 2,
    name: "サイダーガール",
  },
  album: {
    id: 1,
    title: "わっしょい",
  },
};

describe("SongContentの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SongContent song={mockSong} />);
    const imgElement = screen.getByAltText("シンデレラのジャケット画像");

    expect(screen.getByText("シンデレラ")).toBeInTheDocument();
    expect(screen.getByText("サイダーガール")).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockSong.cover_xl);
  });
});
