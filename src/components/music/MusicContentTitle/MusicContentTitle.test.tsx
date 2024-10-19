import { render, screen } from "@testing-library/react";
import MusicContentTitle from "./MusicContentTitle";

describe("MusicContentTitleコンポーネント単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<MusicContentTitle title="アーティスト情報" />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText("アーティスト情報")).toBeInTheDocument();
  });
});
