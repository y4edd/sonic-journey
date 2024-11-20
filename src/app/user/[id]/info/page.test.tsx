import Info from "./page";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";

// next/routerのモック
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    route: "/",
    pathname: "user/id/info",
    query: { id: "12huh" },
    asPath: '',
  })),
}));

// fetchUserをモック
jest.mock("@/utils/apiFunc", () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: "12huh" })),
}));

describe ("Infoコンポーネントのテスト", () => {
  // ロジック
  //loadUser関数
  test("正常なユーザーデータが取得できる場合、userIdが正しく設定され、ユーザー情報が表示される", async () => {
    // コンポーネントをレンダリング
    await act(async ()=> {
      render( <Info />);
    });

    const accountInfo = screen.getByTestId("information");
    expect(accountInfo).toHaveTextContent("アカウント情報");

  // test("サーバーエラーが発生した場合、serverError にエラーメッセージが設定される"), async () => {}
  })
});
