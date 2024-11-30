import type { DeezerArtist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AritstListItemWithCheckBox from "./ArtistListItemWithCheckBox";

const mockArtist: DeezerArtist = {
  id: 111,
  name: "ヒルシカ",
  picture_xl: "example.jpg",
};

describe("ArtistListItemWithCheckboxコンポーネントの単体テスト", () => {
  const mockFn = jest.fn();

  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<AritstListItemWithCheckBox artist={mockArtist} checked={false} onChange={mockFn} />);

    expect(screen.getByRole("img", { name: "ヒルシカのアーティスト画像" })).toHaveAttribute(
      "src",
      `${mockArtist.picture_xl}`,
    );

    expect(screen.getByText("ヒルシカ")).toBeInTheDocument;
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "111");
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("チェックボックスを押下したら、イベントハンドラーが呼ばれること", async () => {
    render(<AritstListItemWithCheckBox artist={mockArtist} checked={false} onChange={mockFn} />);

    await userEvent.click(screen.getByRole("checkbox"));
    expect(mockFn).toHaveBeenCalledWith(111, true);
  });
});
