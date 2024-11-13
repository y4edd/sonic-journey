import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortButtons from "./SortButtons";

describe("SortButtonsコンポーネントの単体テスト", () => {
  const mockFn = jest.fn();

  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SortButtons label="登録日" onSortChange={mockFn} />);
    expect(screen.getByText("登録日昇順")).toBeInTheDocument();
    expect(screen.getByText("登録日降順")).toBeInTheDocument();
  });

  test("昇順ボタンを押下すると、昇順が選択状態となる", async () => {
    render(<SortButtons label="登録日" onSortChange={mockFn} />);
    const ascButton = screen.getByText("登録日昇順");
    const descButton = screen.getByText("登録日降順");

    expect(ascButton).toHaveClass("notSelected");
    expect(descButton).toHaveClass("selected");

    await userEvent.click(ascButton);
    expect(ascButton).toHaveClass("selected");
    expect(descButton).toHaveClass("notSelected");
    expect(mockFn).toHaveBeenCalledWith(true);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("降順ボタンを押下すると、降順が選択状態となる", async () => {
    render(<SortButtons label="登録日" onSortChange={mockFn} />);
    const ascButton = screen.getByText("登録日昇順");
    const descButton = screen.getByText("登録日降順");

    await userEvent.click(ascButton);
    expect(ascButton).toHaveClass("selected");
    expect(descButton).toHaveClass("notSelected");
    expect(mockFn).toHaveBeenCalledWith(true);

    await userEvent.click(descButton);
    expect(ascButton).toHaveClass("notSelected");
    expect(descButton).toHaveClass("selected");
    expect(mockFn).toHaveBeenCalledWith(false);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
