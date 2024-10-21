import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./page";

describe("Login コンポーネントのテスト", () => {
  it("全てのフォーム要素が正しく表示される", () => {
    render(<Login />);

    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
  });

  it("フォームに値が正常に入力される", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("空のフォーム送信でバリデーションエラーが表示される", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: "ログイン" });
    fireEvent.click(submitButton);

    const emailError = await screen.findByText("正しいメールアドレスを入力してください");
    const passwordError = await screen.findByText("パスワードは6文字以上で入力してください");

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it("不十分なパスワードでのバリデーションエラーを表示", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.click(submitButton);

    const passwordError = await screen.findByText("パスワードは6文字以上で入力してください");

    expect(passwordError).toBeInTheDocument();
  });

  it("正しい情報が入力された場合、エラーメッセージが表示されない", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText("メールアドレス");
    const passwordInput = screen.getByLabelText("パスワード");
    const submitButton = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(screen.queryByText("正しいメールアドレスを入力してください")).not.toBeInTheDocument();
    expect(screen.queryByText("パスワードは6文字以上で入力してください")).not.toBeInTheDocument();
  });
});
