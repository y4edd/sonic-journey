import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserRegistration from "./page";

// モックの設定
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// onSubmitのモック化
const mockOnSubmit = jest.fn();
jest.mock("./page", () =>({
  
}))

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

  test("登録成功時にトーストメッセージが表示される", async () => {
    // APIレスポンスをモック
    (onSubmit as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  
    render(<UserRegistration />);
  
    fireEvent.input(screen.getByLabelText("ユーザー名"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード"), {
      target: { value: "password1" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password1" },
    });
  
    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));
  
    // トーストの表示を確認
    await waitFor(() => {
      expect(
        screen.getByText("アカウント登録が完了しました！")
      ).toBeInTheDocument();
    });
  });
});
