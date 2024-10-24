import { render, screen } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButtonコンポーネントの単体テスト", () => {
  test("削除ボタンがレンダリングされること", () => {
    render(<DeleteButton />);
    expect(screen.getByRole("button", { name: "履歴を削除" })).toBeInTheDocument();
  });
});
