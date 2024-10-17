import { render, screen } from "@testing-library/react";
import MenuHeader from "./MenuHeader";

describe("MenuHeaderコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<MenuHeader title="テストタイトル" />);
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
  });
});
