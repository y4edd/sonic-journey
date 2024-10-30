import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./page";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Loginコンポーネントのテスト", () => {
  test("フォームが正しくレンダリングされている", () => {
    render(<Login />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  test("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    render(<Login />);
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(
        screen.getByText("正しいメールアドレスを入力してください", { collapseWhitespace: true }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("パスワードは6文字以上で入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
    });
  });

  test("パスワードやメールアドレスが要件を満たさない場合、エラーメッセージが表示される", async () => {
    render(<Login />);

    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tani" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "passw" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("パスワードは6文字以上で入力してください")).toBeInTheDocument();
    });
  });

  test("正しい入力の場合、ページ遷移が行われる", async () => {
    render(<Login />);

    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tanitune" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  test("サーバーエラーが発生した場合、エラーメッセージが表示される", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "サーバーエラーが発生しました" }),
    });

    render(<Login />);

    fireEvent.input(screen.getByLabelText("メールアドレス"), { target: { value: "tani@example.com" } });
    fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });

    fireEvent.submit(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("サーバーエラーが発生しました")).toBeInTheDocument();
    });
  });
});
