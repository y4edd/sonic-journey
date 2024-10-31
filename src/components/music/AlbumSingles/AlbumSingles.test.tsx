import { render, screen } from "@testing-library/react";
import AlbumSingles from "./AlbumSingles";

beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => {
    return Promise.resolve();
  });

  jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
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
    preview: "example2.com",
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
