import type { SearchAlbum } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SearchAlbumContent from "./SearchAlbumContent";

const mockResult: SearchAlbum = {
  id: 222,
  title: "sampleAlbum",
  cover_xl: "https://sample.com/sample-cover.jpg",
  artist: {
    name: "sampleArtist",
  },
};

const url = "album";

describe("SearchAlbumContentの単体テスト", () => {
  test("アルバム名が表示されているか", () => {
    render(<SearchAlbumContent result={mockResult} url={url} style="grid" />);

    expect(screen.getByText("sampleAlbum")).toBeInTheDocument();
  });

  test("アーティスト名が表示されているか", () => {
    const { getByText } = render(<SearchAlbumContent result={mockResult} url={url} style="grid" />);
    expect(getByText("sampleArtist")).toBeInTheDocument();
  });

  test("画像が正しく表示されているか", () => {
    render(<SearchAlbumContent result={mockResult} url={url} style="grid" />);

    const image = screen.getByRole("img");
    //srcが正しいか
    expect(image).toHaveAttribute("src", "https://sample.com/sample-cover.jpg");
    //altが正しいか
    expect(image).toHaveAttribute("alt", "sampleArtistの画像");
  });

  test("リンクが正しいURLかどうか", () => {
    render(<SearchAlbumContent result={mockResult} url={url} style="grid" />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", `/${url}/${mockResult.id}`);
  });
});
