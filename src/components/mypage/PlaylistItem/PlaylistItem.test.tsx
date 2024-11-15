import type { Playlist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import PlaylistItem from "./PlaylistItem";

const mockPlaylist: Playlist = {
  id: 1,
  name: "勉強用",
  user_id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("PlaylistItemの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<PlaylistItem playlist={mockPlaylist} />);

    expect(
      screen.getByRole("link", { name: mockPlaylist.name })
    ).toHaveAttribute("href", `/mypage/playlist/${mockPlaylist.id}`);
  });
});
