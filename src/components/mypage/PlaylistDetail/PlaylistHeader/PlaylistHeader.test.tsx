import { render, screen } from "@testing-library/react";
import { PlaylistHeader } from "./PlaylistHeader";
describe("PlaylistHeaderの単体テスト", () => {
  const playlistSongInfo = [
    {
      api_song_id: 1,
      title: "言った。",
    },
    {
      api_song_id: 2,
      title: "ただ君に雨れ",
    },
  ];
  const noPlaylistSong: { api_song_id: number; title: string }[] = [];
  test("レンダリングが適切に行われていること", () => {
    render(
      <PlaylistHeader playlistTitle="睡眠用" playlistId={1} playlistSongInfo={playlistSongInfo} />,
    );
    expect(screen.getByText("睡眠用")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "編集" })).toBeInTheDocument();
  });
  test("プレイリストに楽曲が追加されていないとき、編集ボタンが表示されないこと", () => {
    render(
      <PlaylistHeader playlistTitle="睡眠用" playlistId={1} playlistSongInfo={noPlaylistSong} />,
    );
    expect(screen.getByText("睡眠用")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "編集" })).not.toBeInTheDocument();
  });
});
