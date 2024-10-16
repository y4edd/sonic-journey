import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("フッターの単体テスト", () => {
  test("フッターに「@Yaeda Co., Ltd.」が表示", () => {
    render(<Footer />);

    expect(screen.getByText("@Yaeda Co., Ltd.")).toBeInTheDocument();
  });
});
