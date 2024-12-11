import type { Playlist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import PlaylistList from "./PlaylistList";

const mockPlaylists: Playlist[] = [
  {
    id: 1,
    name: "勉強用",
    user_id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "睡眠用",
    user_id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("PlaylistListコンポーネントのテスト", () => {
  test("playlistsが空の場合、エラーメッセージが表示されること", () => {
    render(<PlaylistList playlists={[]} />);
    expect(screen.getByText("プレイリストは登録されていません"));
  });

  test("playlistsの数だけ一覧表示されること", () => {
    render(<PlaylistList playlists={mockPlaylists} />);
    expect(screen.getByText("勉強用")).toBeInTheDocument();
    expect(screen.getByText("睡眠用")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
