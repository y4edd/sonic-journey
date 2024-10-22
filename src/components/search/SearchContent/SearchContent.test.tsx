import { Result } from "@/types/deezer";
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
};

describe("SearchContentコンポーネントのテスト", () => {
  it("アーティスト名が正しく表示されているか", () => {
    const { getByText } = render(<SearchContent result={mockResult} />);

    expect(getByText("Test Artist")).toBeInTheDocument();
  });
});
