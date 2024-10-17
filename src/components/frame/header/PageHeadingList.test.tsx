import { render, screen } from "@testing-library/react";
import { PageHeadingList } from "./PageHeadingList";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/mocked-path"),
}));
jest.mock("next/link", () => {
  return ({ children }: { children: string }) => {
    return children;
  };
});

describe("ヘッダー見出しコンポーネントの単体テスト", () => {
  test("見出しに「新着」「ランキング」「特集」「ジャンル」が表示", () => {
    render(<PageHeadingList />);

    expect(screen.getByText("新着")).toBeInTheDocument();
    expect(screen.getByText("ランキング")).toBeInTheDocument();
    expect(screen.getByText("特集")).toBeInTheDocument();
    expect(screen.getByText("ジャンル")).toBeInTheDocument();
  });
});
