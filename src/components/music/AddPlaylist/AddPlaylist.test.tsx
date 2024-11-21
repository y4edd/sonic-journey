import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AddPlaylist } from "./AddPlaylist";

jest.mock("@/utils/apiFunc", () => ({
  __esModule: true,
  fetchUser: jest.fn(() => Promise.resolve({ id: "test_user" })),
  getUserPlaylist: jest.fn(() => Promise.resolve([{ user_id: "1" }])),
  getAddPlaylists: jest.fn(() => Promise.resolve({ user: "1", id: 1 })),
}));

describe("AddPlaylistの単体テスト", () => {
  test("レンダリングが適切に行われていること", () => {
    render(<AddPlaylist id={1} />);
    expect(
      screen.getByRole("button", { name: "プレイリストに追加" })
    ).toBeInTheDocument();
  });
});
