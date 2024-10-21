import { render, screen } from "@testing-library/react";
import { SongItem } from "./SongItem";

jest.mock("@/constants/constant", () => ({
  ...jest.requireActual("@/constants/constant"),
  GETMONDAYOFTHISWEEK: new Date("2024-10-14"),
}));

const SONGS = [
  {
    album: {
      id: 652941091,
      title: "初夏",
      cover_xl:
        "https://e-cdns-images.dzcdn.net/images/cover/8f1f78445a8790554f34248b16b18378/1000x1000-000000-80-0-0.jpg",
    },
    artist: { id: 121146382, name: "Ado" },
    id: 652941091,
    title: "初夏",
  },
];

describe("SongItemコンポーネントの単体テスト", () => {
  test("レンダリングされ、画像が表示される", () => {
    render(<SongItem songs={SONGS} gridLayout={true} />);
    expect(screen.getByText("初夏")).toBeInTheDocument();
    expect(screen.getByText("Ado")).toBeInTheDocument();
  });
  test("グリッドレイアウトが選択されている時、楽曲がグリッド表示される", () => {
    render(<SongItem songs={SONGS} gridLayout={true} />);
    expect(screen.getByText("初夏")).toHaveClass("songNameGrid");
  });
  test("リストレイアウトが選択されている時、楽曲がリスト表示される", () => {
    render(<SongItem songs={SONGS} gridLayout={false} />);
    expect(screen.getByText("初夏")).toHaveClass("songNameList");
  });
});
