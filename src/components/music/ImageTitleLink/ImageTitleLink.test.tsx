import { render, screen } from "@testing-library/react";
import ImageTitleLink from "./ImageTitleLink";

describe("ImageTitleLinkコンポーネント単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<ImageTitleLink url="/artist/1" name="Aquatimez" image="example.jpeg" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Aquatimezの画像");
    expect(screen.getByText("Aquatimez")).toBeInTheDocument();
  });
});
