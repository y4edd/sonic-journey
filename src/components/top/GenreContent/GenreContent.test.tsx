import { render, screen } from "@testing-library/react";
import GenreContent from "./GenreContent";

describe("GenreContentコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<GenreContent genre={{ id: 1, name: "洋楽" }} />);
    expect(screen.getByText("洋楽")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
