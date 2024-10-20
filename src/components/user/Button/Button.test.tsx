import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button コンポーネントの単体テスト", () => {
  it("propsで渡されたtypeとvalueが正しく表示される", () => {
    render(<Button type="submit" value="ユーザー登録" className="test-class" />);

    const buttonElement = screen.getByRole("button", { name: "ユーザー登録" });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("propsで渡されたclassNameが適用される", () => {
    render(<Button type="button" value="ユーザー登録" className="custom-class" />);

    const buttonElement = screen.getByRole("button", { name: "ユーザー登録" });

    expect(buttonElement).toHaveClass("custom-class");
  });
});
