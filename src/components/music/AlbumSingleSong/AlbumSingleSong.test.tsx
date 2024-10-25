import { fireEvent, render, screen } from "@testing-library/react";
import AlbumSingleSong from "./AlbumSingleSong";
import { AlbumAudioProvider } from "@/context/AlbumAudioContext";

beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
    return Promise.resolve();
  });

  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("AlbumSingleSongコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、正しくレンダリングすること", () => {
    render(
      <AlbumAudioProvider>
        <AlbumSingleSong
          id={1}
          num={1}
          title="タイトル"
          preview="example.com"
        />
      </AlbumAudioProvider>
    );

    expect(screen.getByText("01: タイトル")).toBeInTheDocument();
    expect(
      screen.queryByText("プレビューが読み込めません")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/music/1");
  });

  test("previewがなかった場合に、その旨が表示されること", () => {
    render(
      <AlbumAudioProvider>
        <AlbumSingleSong id={1} num={1} title="タイトル" preview="" />
      </AlbumAudioProvider>
    );
    expect(screen.getByText("プレビューが読み込めません")).toBeInTheDocument();
  });

  test("numの値が9より大きい場合、先頭に0が付かないこと", () => {
    render(
      <AlbumAudioProvider>
        <AlbumSingleSong
          id={1}
          num={15}
          title="タイトル"
          preview="example.com"
        />
      </AlbumAudioProvider>
    );
    expect(screen.getByText("15: タイトル")).toBeInTheDocument();
  });

  test("再生ボタンをクリックすると、playメソッドが呼び出されること", () => {
    render(
      <AlbumAudioProvider>
        <AlbumSingleSong
          id={1}
          num={15}
          title="タイトル"
          preview="example.com"
        />
      </AlbumAudioProvider>
    );

    const playButton = screen.getByLabelText("playButton");
    fireEvent.click(playButton);

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test("停止ボタンをクリックすると、stopメソッドが呼び出されること", () => {
    render(
      <AlbumAudioProvider>
        <AlbumSingleSong
          id={1}
          num={15}
          title="タイトル"
          preview="example.com"
        />
      </AlbumAudioProvider>
    );

    const stopButton = screen.getByLabelText("stopButton");
    fireEvent.click(stopButton);

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });
});
