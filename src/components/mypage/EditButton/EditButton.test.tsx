import { render, screen } from "@testing-library/react";
import EditButton from "./EditButton";

describe("EditButtonコンポーネントの単体テスト", () => {
  test("編集ボタンがレンダリングされること", () => {
    render(<EditButton />);
    expect(screen.getByText("編集")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
