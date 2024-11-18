import PlayHistory from "@/components/music/PlayHistory/PlayHistory";
import { getSong } from "@/utils/apiFunc";
import { getTokenFromCookie } from "@/utils/getTokenFromCookie";
import { getPlayHistory } from "@/utils/history";
import { render, screen } from "@testing-library/react";

jest.mock("@/utils/getTokenFromCookie", () => ({
  getTokenFromCookie: jest.fn(),
}));

jest.mock("@/utils/history", () => ({
  getPlayHistory: jest.fn(),
}));

jest.mock("@/utils/apiFunc", () => ({
  getSong: jest.fn(),
}));

describe("PlayHistoryコンポーネントの単体テスト", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("試聴履歴が正しくレンダリングされること", async () => {
    const mockSongs = [
      {
        id: 1,
        title: "楽曲1",
        cover_xl: "song2.jpg",
        artist: { name: "アーティスト1" },
      },
      {
        id: 2,
        title: "楽曲2",
        cover_xl: "song2.jpg",
        artist: { name: "アーティスト2" },
      },
    ];

    (getTokenFromCookie as jest.Mock).mockReturnValue("mockToken");
    (getPlayHistory as jest.Mock).mockResolvedValue({ songIds: [1, 2] });
    (getSong as jest.Mock).mockImplementation((id: number) =>
      Promise.resolve({ resSongData: mockSongs.find((song) => song.id === id) }),
    );

    // 非同期コンポーネントを呼び出し、JSX を取得、レンダリング
    // 非同期のサーバーコンポーネントのテストのため、このようにしています。
    const jsx = await PlayHistory();
    render(jsx);

    for (const song of mockSongs) {
      expect(screen.getByText(song.title)).toBeInTheDocument();
      expect(screen.getByText(song.artist.name)).toBeInTheDocument();
      const image = screen.getByAltText(`${song.title}の画像`) as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain(song.cover_xl);
    }
  });

  test("試聴履歴がなかった場合、その旨が表示されること", async () => {
    (getTokenFromCookie as jest.Mock).mockReturnValue("mockToken");
    (getPlayHistory as jest.Mock).mockResolvedValue({ songIds: [] });

    const jsx = await PlayHistory();
    render(jsx);

    expect(screen.getByText("試聴履歴がありません")).toBeInTheDocument();
  });

  test("ログインしていない場合、ログインユーザーの機能であることが表示されること", async () => {
    (getTokenFromCookie as jest.Mock).mockReturnValue(null);
    (getPlayHistory as jest.Mock).mockResolvedValue(null);

    const jsx = await PlayHistory();
    render(jsx);

    expect(screen.getByRole("link", { name: "ログインユーザーの機能です" })).toBeInTheDocument();
  });
});
