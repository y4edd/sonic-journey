import { render, screen } from "@testing-library/react";
import { ChartTitle } from "./ChartTitle";

import "@testing-library/jest-dom";

describe("ChartTitleコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<ChartTitle title="新着チャート" />);
    expect(screen.findByText("新着チャート")).toBeInTheDocument;
  });
});
