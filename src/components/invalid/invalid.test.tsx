import { fireEvent, render, screen } from "@testing-library/react";
import UnAuthenticated from "./invalid";

describe("UnAuthenticatedコンポーネントのテスト", () => {
  test("不正な画面遷移のメッセージが表示されること", () => {
    const mockClickToLogin = jest.fn();

    render(<UnAuthenticated clickToLogin={mockClickToLogin} />);

    expect(
      screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),
    ).toBeInTheDocument();
  });

  test("ログインボタンが表示されること", () => {
    const mockClickToLogin = jest.fn();

    render(<UnAuthenticated clickToLogin={mockClickToLogin} />);

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    expect(loginButton).toBeInTheDocument();
  });

  test("ログインボタンがクリックされたとき、clickToLoginが呼び出されること", () => {
    const mockClickToLogin = jest.fn();

    render(<UnAuthenticated clickToLogin={mockClickToLogin} />);

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    fireEvent.click(loginButton);

    expect(mockClickToLogin).toHaveBeenCalledTimes(1);
  });
});
