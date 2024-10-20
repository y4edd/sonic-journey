import { render, screen } from "@testing-library/react";
import Information from "./Information";

describe("Informationコンポーネントのテスト", () => {
  it("渡されたテキストが正しく表示される", () => {
    const testText = "テスト用";

    render(<Information text={testText} />);

    const element = screen.getByText(testText);
    expect(element).toBeInTheDocument();
  });

  it("情報コンポーネントのクラスが正しく適用されている", () => {
    const testText = "スタイルのテスト";

    render(<Information text={testText} />);

    const element = screen.getByText(testText);
    expect(element).toHaveClass("information");
  });
});
