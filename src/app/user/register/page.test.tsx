import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserRegistration from "./page";

// モックの設定
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("UserRegistrationコンポーネントのテスト", () => {
  test("フォームが正しくレンダリングされている", () => {
    render(<UserRegistration />);
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
  });

  test("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    render(<UserRegistration />);
    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(
        screen.getByText("ユーザー名は必須です", { collapseWhitespace: true }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("正しいメールアドレスを入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();

      const errorMessages = screen.getAllByText("パスワードは6文字以上で入力してください");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test("パスワードが一致しない場合、エラーメッセージが表示される", async () => {
    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "password1" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password2" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });

  test("正しい入力の場合、ページ遷移が行われる", async () => {
    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("ユーザー名"), {
      target: { value: "tanitune" },
    });
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tanisan@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "password" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/user/login");
    });
  });

  test("サーバーエラーが発生した場合、エラーメッセージが表示される", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "サーバーエラーが発生しました" }),
    });

    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "tanitune" } });
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tani@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password" } });
    fireEvent.input(screen.getByLabelText("パスワード確認"), { target: { value: "password" } });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(screen.getByText("サーバーエラーが発生しました")).toBeInTheDocument();
    });
  });
});
