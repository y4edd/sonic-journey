import type { Playlist } from "@/types/deezer";
import { fetchUser, getUserPlaylist } from "@/utils/apiFunc";
import { render, screen, waitFor } from "@testing-library/react";
import { PlaylistEdit } from "./PlaylistEdit";

jest.mock("@/utils/apiFunc", () => ({
  fetchUser: jest.fn(),
  getUserPlaylist: jest.fn(),
}));

describe("PlaylistEditコンポーネントの単体テスト", () => {
  const mockSetEditModalOpen = jest.fn();
  const mockUser: { id: string } = {
    id: "1",
  };
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

  (fetchUser as jest.Mock).mockResolvedValue(mockUser);
  (getUserPlaylist as jest.Mock).mockResolvedValue(mockPlaylists);
  it("レンダリングが適切に行われていること", async () => {
    render(<PlaylistEdit setEditModalOpen={mockSetEditModalOpen} />);

    expect(screen.getByText("プレイリスト編集")).toBeInTheDocument();

    await waitFor(() => {
      mockPlaylists.map((playlist) => {
        expect(screen.getByText(playlist.name)).toBeInTheDocument();
      });
    });
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });
});
