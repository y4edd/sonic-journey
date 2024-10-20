import { render, screen } from "@testing-library/react";
import Guide from "./Guide";

describe("Guide コンポーネントのテスト", () => {
  const href = "/login";
  const message = "ログインはこちら";

  it("リンクとメッセージが正しく表示される", () => {
    render(<Guide href={href} message={message} />);

    const linkElement = screen.getByRole("link", { name: message });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", href);
  });

  it("CSSクラスが適用されている", () => {
    render(<Guide href={href} message={message} />);

    const divElement = screen.getByText(message).closest("div");
    expect(divElement).toHaveClass("login");
  });
});
