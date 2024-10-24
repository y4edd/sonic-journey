import { render, screen } from "@testing-library/react";
import EmptyContent from "./EmptyContent";

describe("EmptyContentコンポーネント単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングすること", () => {
    render(<EmptyContent title="テスト" />);
    expect(screen.getByText(/テスト/)).toBeInTheDocument();
  });
});
