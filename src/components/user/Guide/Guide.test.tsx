import { render, screen } from "@testing-library/react";
import Guide from "./Guide";

describe("Guide コンポーネントのテスト", () => {
  const text = "ログインは";
  const href = "/login";
  const message = "こちら";

  test("リンクとメッセージが正しく表示される", () => {
    render(<Guide guideText={text} href={href} message={message} />);

    const linkElement = screen.getByRole("link", { name: message });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", href);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("CSSクラスが適用されている", () => {
    render(<Guide guideText={text} href={href} message={message} />);

    const divElement = screen.getByText(message).closest("div");
    expect(divElement).toHaveClass("login");
  });
});
