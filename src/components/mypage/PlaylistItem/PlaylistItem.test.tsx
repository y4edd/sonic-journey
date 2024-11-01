import type { Playlist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import PlaylistItem from "./PlaylistItem";

const mockPlaylist: Playlist = { id: 1, name: "ランニング用" };

describe("PlaylistItemの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<PlaylistItem playlist={mockPlaylist} />);

    expect(screen.getByRole("link", { name: mockPlaylist.name })).toHaveAttribute(
      "href",
      `/mypage/playlist/${mockPlaylist.id}`,
    );
  });
});
