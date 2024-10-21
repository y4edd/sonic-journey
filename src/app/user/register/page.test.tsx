import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import UserRegistration from "./page";
import "@testing-library/jest-dom";

// モックの設定
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("UserRegistrationコンポーネントのテスト", () => {
  it("フォームが正しくレンダリングされている", () => {
    render(<UserRegistration />);
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
  });

  it("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
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
      expect(
        screen.getByText("パスワードは6文字以上で入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("確認用パスワードは6文字以上で入力してください", {
          collapseWhitespace: true,
        }),
      ).toBeInTheDocument();
    });
  });

  it("パスワードが一致しない場合、エラーメッセージが表示される", async () => {
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

  it("正しい入力の場合、ページ遷移が行われる", async () => {
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
});
