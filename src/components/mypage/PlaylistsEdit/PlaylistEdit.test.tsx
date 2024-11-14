import { render, screen, waitFor } from "@testing-library/react";
import { PlaylistEdit } from "./PlaylistEdit";
import { getUserInfo, getUserPlaylist } from "@/utils/apiFunc";
import type { UserInfo } from "@/types/user";
import type { Playlist } from "@/types/deezer";

jest.mock("@/utils/apiFunc", () => ({
  getUserInfo: jest.fn(),
  getUserPlaylist: jest.fn(),
}));

describe("PlaylistEditコンポーネントの単体テスト", () => {
  const mockSetEditModalOpen = jest.fn();
  const mockUser: UserInfo = {
    id: "1",
    name: "tani",
    email: "tani@ex.com",
    createdAt: new Date(),
    updatedAt: new Date(),
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

  (getUserInfo as jest.Mock).mockResolvedValue(mockUser);
  (getUserPlaylist as jest.Mock).mockResolvedValue(mockPlaylists);
  it("レンダリングが適切に行われていること", async () => {
    render(<PlaylistEdit setEditModalOpen={mockSetEditModalOpen} />);

    expect(screen.getByText("プレイリスト編集")).toBeInTheDocument();

    await waitFor(() => {
      mockPlaylists.forEach((playlist) => {
        expect(screen.getByText(playlist.name)).toBeInTheDocument();
      });
    });
    expect(screen.getByRole("button", { name: "閉じる" })).toBeInTheDocument();
  });
});
