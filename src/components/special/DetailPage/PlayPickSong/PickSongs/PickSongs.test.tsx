import { AlbumAudioProvider } from "@/context/AlbumAudioContext";
import { render, screen } from "@testing-library/react";
import PickSongs from "./PickSongs";

beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
    return Promise.resolve();
  });

  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("PickSongsコンポーネントの単体テスト", () => {
  const pickSong = {
    id: 1,
    title: "あいつら全員まよねーず",
    preview: "example.com",
    cover_xl: "sampleCover.png",
    duration: 30,
    artist: {
      id: 1,
      name: "ずっとまよねーずをかければいいのに。",
    },
    album: {
      id: 1,
      title: "マヨネーズ話",
    },
  };
  test("受け取ったpropsを反映し、正しくレンダリングすること", () => {
    render(
      <AlbumAudioProvider>
        <PickSongs pickSong={pickSong} />
      </AlbumAudioProvider>,
    );
    expect(screen.getByText("あいつら全員まよねーず")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
