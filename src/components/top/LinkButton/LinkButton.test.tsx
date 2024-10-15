import { render, screen } from "@testing-library/react";
import LinkButton from "./LinkButton";

describe("LinkButtonコンポーネント", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<LinkButton label="もっと見る" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("もっと見る")).toBeInTheDocument();
  });
});
