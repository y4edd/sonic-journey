import type { DeezerArtist } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SearchArtistResultContent from "./SearchArtistResultContent";

const mockResult: DeezerArtist = {
  id: 333,
  name: "test",
  picture_xl: "https://sample.com/sample-cover.jpg",
};

describe("SearchArtistContentの単体テスト", () => {
  test("アーティスト名が正しく表示されているか", () => {
    render(<SearchArtistResultContent result={mockResult} url="artist" style="grid" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  test("画像が正しく表示されているか", () => {
    render(<SearchArtistResultContent result={mockResult} url="artist" style="grid" />);

    const image = screen.getByRole("img");

    // srcが正しいか
    expect(image).toHaveAttribute("src", "https://sample.com/sample-cover.jpg");
    // altが正しいか
    expect(image).toHaveAttribute("alt", "testの画像");
  });

  test("リンクが正しいかどうか", () => {
    render(<SearchArtistResultContent result={mockResult} url="artist" style="grid" />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", `/artist/${mockResult.id}`);
  });
});
