import { render, screen } from "@testing-library/react";
import AlbumSingles from "./AlbumSingles";

jest.mock("../../../utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteSongsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ songId: 7878479, updatedAt: new Date() }],
  })),
}));

jest.mock("../AlbumSingleSong/AlbumSingleSong", () => {
  return function MockAlbumSingleSong({ id, title, num }: { id: number; title: string; num: number }) {
    return (
      <div data-testid={`song-${id}`}>
        {num.toString().padStart(2, "0")}: {title}
      </div>
    );
  };
});

beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve());
  jest.spyOn(HTMLMediaElement.prototype, "pause");
});

const AlbumSingleProps = [
  {
    id: 1,
    title: "テスト1",
    duration: 180,
    preview: "example1.com",
    cover_xl: "example1.jpeg",
  },
  {
    id: 2,
    title: "テスト2",
    duration: 190,
    preview: "example2.com",
    cover_xl: "example2.jpeg",
  },
  {
    id: 3,
    title: "テスト3",
    duration: 200,
    preview: "example3.com",
    cover_xl: "example2.jpeg",
  },
];

describe("AlbumSinglesコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、3件ともレンダリングされること", () => {
    render(<AlbumSingles singles={AlbumSingleProps} />);
    expect(screen.getByText("01: テスト1")).toBeInTheDocument();
    expect(screen.getByText("02: テスト2")).toBeInTheDocument();
    expect(screen.getByText("03: テスト3")).toBeInTheDocument();
  });
});
