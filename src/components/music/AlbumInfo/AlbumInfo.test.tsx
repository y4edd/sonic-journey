import { render, screen } from "@testing-library/react";
import AlbumInfo from "./AlbumInfo";

describe("AlbumInfoコンポーネント単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<AlbumInfo image="example.jpg" title="IとU" artist="杉本" nb_tracks={10} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "IとUのジャケット");
    expect(screen.getByText("杉本")).toBeInTheDocument();
    expect(screen.getByText("IとU")).toBeInTheDocument();
    expect(screen.getByText("10曲")).toBeInTheDocument();
  });
});
