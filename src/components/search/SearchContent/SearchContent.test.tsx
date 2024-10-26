import type { Result } from "@/types/deezer";
import { render } from "@testing-library/react";
import SearchContent from "./SearchContent";

// モックデータ
const mockResult: Result = {
  id: 1,
  title: "Test Song",
  preview: "https://example.com/preview",
  artist: {
    id: 2,
    name: "Test Artist",
    picture_big: "https://example.com/image.jpg",
  },
  cover: "https://example.com/cover.jpg",
};

describe("SearchContentコンポーネントのテスト", () => {
  test("アーティスト名が正しく表示されているか", () => {
    const { getByText } = render(<SearchContent result={mockResult} url="url" />);

    //アーティスト名が表示されているか
    expect(getByText("Test Artist")).toBeInTheDocument();
  });

  test("曲の画像が正しく表示されているか", () => {
    const { getByAltText } = render(<SearchContent result={mockResult} url="url" />);

    //srcとaltが正しく表示されているか
    const image = getByAltText("Test Artistの画像");
    expect(image).toHaveAttribute("src", "https://example.com/cover.jpg");
    expect(image).toHaveAttribute("alt", "Test Artistの画像");
  });
});
