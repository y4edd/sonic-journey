import { render, screen } from "@testing-library/react";
import { act } from "react";
import Info from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "user/id/info",
    query: { id: "12huh" },
    asPath: "",
  })),
}));

jest.mock("@/utils/apiFunc", () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: "12huh" })),
}));

describe("Infoコンポーネントのテスト", () => {
  test("正常なユーザーデータが取得できる場合、userIdが正しく設定され、ユーザー情報ページが表示される", async () => {
    await act(async () => {
      render(<Info />);
    });

    const accountInfo = screen.getByTestId("information");
    expect(accountInfo).toHaveTextContent("アカウント情報");
  });
});
