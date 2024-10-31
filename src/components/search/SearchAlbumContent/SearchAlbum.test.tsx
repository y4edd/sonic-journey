import type { ArtistAlbum } from "@/types/deezer";
import { render, screen } from "@testing-library/react";
import SearchAlbumContent from "./SearchAlbumContent";

const mockResult: ArtistAlbum = {
  id: 222,
  title: "sampleAlbum",
  link: "使わない",
  cover: "使わない",
  cover_small: "使わない",
  cover_medium: "使わない",
  cover_big: "使わない",
  cover_xl: "https://sample.com/sample-cover.jpg",
  md5_image: "使わない",
  genre_id: 0,
  nb_tracks: 0,
  record_type: "使わない",
  tracklist: "使わない",
  explicit_lyrics: false,
  artist: {
    id: 333,
    name: "sampleArtist",
    link: "使わない",
    picture: "使わない",
    picture_small: "使わない",
    picture_medium: "使わない",
    picture_big: "使わない",
    picture_xl: "使わない",
    tracklist: "使わない",
    type: "使わない",
  },
  type: "使わない",
};

const url = "album";

describe("SearchAlbumContentの単体テスト", () => {
  test("アルバム名が表示されているか", () => {
    render(<SearchAlbumContent result={mockResult} url="album" />);

    expect(screen.getByText("sampleAlbum")).toBeInTheDocument();
  });

  test("アーティスト名が表示されているか", () => {
    const { getByText } = render(<SearchAlbumContent result={mockResult} url="album" />);
    expect(getByText("sampleArtist")).toBeInTheDocument();
  });

  test("画像が正しく表示されているか", () => {
    render(<SearchAlbumContent result={mockResult} url="albu" />);

    const image = screen.getByRole("img");
    //srcが正しいか
    expect(image).toHaveAttribute("src", "https://sample.com/sample-cover.jpg");
    //altが正しいか
    expect(image).toHaveAttribute("alt", "sampleArtistの画像");
  });

  test("リンクが正しいURLかどうか", () => {
    render(<SearchAlbumContent result={mockResult} url={url} />);

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", `/${url}/${mockResult.id}`);
  });
});
