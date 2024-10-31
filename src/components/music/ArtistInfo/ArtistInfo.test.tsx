import { render, screen } from "@testing-library/react";
import ArtistInfo from "./ArtistInfo";

describe("ArtistInfoコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングすること", () => {
    render(<ArtistInfo image="example.jpg" name="bluuuue" />);
    expect(screen.getByText("bluuuue")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "example.jpg");
  });
});
