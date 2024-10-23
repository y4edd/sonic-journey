import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Edit from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Editコンポーネントのテスト", () => {
  let push: jest.Mock;

  beforeEach(() => {
    push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  test("フォームの初期状態が正しく表示されること", () => {
    render(<Edit />);

    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "更新" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "戻る" })).toBeInTheDocument();
  });

  test("バリデーションエラーメッセージが表示されること", async () => {
    render(<Edit />);

    fireEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(screen.getByText("ユーザー名は必須です")).toBeInTheDocument();
      expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("パスワードは6文字以上で入力してください")).toBeInTheDocument();
      expect(screen.getByText("確認用パスワードは6文字以上で入力してください")).toBeInTheDocument();
    });
  });

  test("戻るボタンをクリックすると遷移すること", async () => {
    render(<Edit />);

    fireEvent.click(screen.getByRole("button", { name: "戻る" }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/user/information");
    });
  });

  test("フォームが正常に送信され、マイページに遷移すること", async () => {
    render(<Edit />);

    fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "tanitune" } });
    fireEvent.input(screen.getByLabelText("メールアドレス"), { target: { value: "tani@example.com" } });
    fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
    fireEvent.input(screen.getByLabelText("パスワード確認"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(screen.getByText("アカウント情報が変更されました")).toBeInTheDocument();
      expect(push).toHaveBeenCalledWith("/mypage");
    });
  });

  test("パスワードが一致しない場合のエラーメッセージが表示されること", async () => {
    render(<Edit />);

    fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
    fireEvent.input(screen.getByLabelText("パスワード確認"), { target: { value: "password456" } });

    fireEvent.click(screen.getByRole("button", { name: "更新" }));

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });
});
