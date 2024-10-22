import { render, screen } from "@testing-library/react";
import Guide from "./Guide";

describe("Guide コンポーネントのテスト", () => {
  const text = "ログインは";
  const href = "/login";
  const message = "こちら";

  it("リンクとメッセージが正しく表示される", () => {
    render(<Guide text={text} href={href} message={message} />);

    const linkElement = screen.getByRole("link", { name: message });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", href);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("CSSクラスが適用されている", () => {
    render(<Guide text={text} href={href} message={message} />);

    const divElement = screen.getByText(message).closest("div");
    expect(divElement).toHaveClass("login");
  });
});
