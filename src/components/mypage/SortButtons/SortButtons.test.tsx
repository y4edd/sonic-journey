import { fireEvent, render, screen } from "@testing-library/react";
import SortButtons from "./SortButtons";

describe("SortButtonsコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SortButtons label="登録日" />);
    expect(screen.getByText("登録日昇順")).toBeInTheDocument();
    expect(screen.getByText("登録日降順")).toBeInTheDocument();
  });

  test("降順ボタンを押下すると、降順が選択状態となる", () => {
    render(<SortButtons label="登録日" />);
    const ascButton = screen.getByText("登録日昇順");
    const descButton = screen.getByText("登録日降順");

    expect(ascButton).toHaveClass("selected");
    expect(descButton).toHaveClass("notSelected");

    fireEvent.click(descButton);
    expect(ascButton).toHaveClass("notSelected");
    expect(descButton).toHaveClass("selected");
  });

  test("昇順ボタンを押下すると、昇順が選択状態となる", () => {
    render(<SortButtons label="登録日" />);
    const ascButton = screen.getByText("登録日昇順");
    const descButton = screen.getByText("登録日降順");

    fireEvent.click(descButton);
    expect(ascButton).toHaveClass("notSelected");
    expect(descButton).toHaveClass("selected");

    fireEvent.click(ascButton);
    expect(ascButton).toHaveClass("selected");
    expect(descButton).toHaveClass("notSelected");
  });
});
