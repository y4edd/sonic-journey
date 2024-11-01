import type { Playlist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import PlaylistList from "./PlaylistList";

const mockPlaylists: Playlist[] = [
  { id: 1, name: "ランニング用" },
  { id: 2, name: "雨の日に聞く" },
];

describe("PlaylistListコンポーネントのテスト", () => {
  test("playlistsが空の場合、エラーメッセージが表示されること", () => {
    render(<PlaylistList playlists={[]} />);
    expect(screen.getByText("プレイリストは登録されていません"));
  });

  test("playlistsの数だけ一覧表示されること", () => {
    render(<PlaylistList playlists={mockPlaylists} />);
    expect(screen.getByText("ランニング用")).toBeInTheDocument();
    expect(screen.getByText("雨の日に聞く")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
