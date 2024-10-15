import { render, screen } from "@testing-library/react";
import ContentTitle from "./ContentTitle";

describe("ContentTitleコンポーネント単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<ContentTitle title="特集" />);
    expect(screen.getByText("特集")).toBeInTheDocument();
  });
});
