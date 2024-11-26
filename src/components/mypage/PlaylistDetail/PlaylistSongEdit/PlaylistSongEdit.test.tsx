import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { PlaylistSongEdit } from "./PlaylistSongEdit";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PlaylistSongEditの単体テスト", () => {
  const mockSetModalOpen = jest.fn();
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
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  test("レンダリングが適切に行われていること", () => {
    render(
      <PlaylistSongEdit
        playlistId={1}
        playlistSongInfo={playlistSongInfo}
        setEditModalOpen={mockSetModalOpen}
      />,
    );
    expect(screen.getByText("プレイリストの編集")).toBeInTheDocument();
    expect(screen.getByText("言った。")).toBeInTheDocument();
    expect(screen.getByText("ただ君に雨れ")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });
  test("閉じるボタンを押すとmodalOpenが呼ばれる", async () => {
    const user = userEvent.setup();
    render(
      <PlaylistSongEdit
        playlistId={1}
        playlistSongInfo={playlistSongInfo}
        setEditModalOpen={mockSetModalOpen}
      />,
    );
    const closeButton = screen.getByRole("button", { name: "閉じる" });
    await user.click(closeButton);
    expect(mockSetModalOpen).toHaveBeenCalled();
  });

  test("プレイリストに楽曲が追加されていないとき、適切にレンダリングされる", () => {
    render(
      <PlaylistSongEdit
        playlistId={1}
        playlistSongInfo={noPlaylistSong}
        setEditModalOpen={mockSetModalOpen}
      />,
    );
    expect(screen.getByText("プレイリストの編集")).toBeInTheDocument();
    expect(screen.getByText("まずは曲を追加しましょう")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });
});
