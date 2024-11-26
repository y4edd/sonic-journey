import type { DeezerSong } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SongListItemWithCheckbox from "./SongListItemWithCheckbox";

const mockSong: DeezerSong = {
  id: 111,
  title: "分針を噛む",
  cover_xl: "example.jpg",
  release_date: "2024-10-17",
  artist: {
    id: 222,
    name: "ずっと真昼でいいのに",
  },
  album: {
    id: 333,
    title: "誤った真実からの就寝",
  },
};

describe("SongListItemWithCheckboxコンポーネントの単体テスト", () => {
  const mockFn = jest.fn();

  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SongListItemWithCheckbox song={mockSong} checked={false} onChange={mockFn} />);

    expect(screen.getByRole("img", { name: "分針を噛むのジャケット画像" })).toHaveAttribute(
      "src",
      `${mockSong.cover_xl}`,
    );

    expect(screen.getByText("分針を噛む")).toBeInTheDocument;
    expect(screen.getByText("ずっと真昼でいいのに")).toBeInTheDocument;
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "111");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("チェックボックスを押下したら、イベントハンドラーが呼ばれること", async () => {
    render(<SongListItemWithCheckbox song={mockSong} checked={false} onChange={mockFn} />);

    await userEvent.click(screen.getByRole("checkbox"));
    expect(mockFn).toHaveBeenCalledWith(111, true);
  });
});
