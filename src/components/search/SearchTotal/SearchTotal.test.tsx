import { render, screen } from "@testing-library/react";
import SearchTotal from "./SearchTotal";

describe("SearchTotalコンポーネントの単体テスト", () => {
  test("nameとsearchTotalが正しく表示されているか", () => {
    const name = "シングル";
    const searchTotal = "10";
    render(<SearchTotal name={name} searchTotal={searchTotal} />);

    expect(screen.getByText(`${name}(${searchTotal}件)`)).toBeInTheDocument();
  });
});
