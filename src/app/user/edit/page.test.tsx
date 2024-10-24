import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Edit from "./page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// jest.useFakeTimers();
// jest.spyOn(global,"setTimeout");

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

  // FIXME:ページ遷移テスト
  // test("フォームが正常に送信され、1.5秒後にマイページに遷移すること", async () => {
  //   const { timer } = require("./page");
  //   render(<Edit />);
  //   timer();

  //   fireEvent.input(screen.getByLabelText("ユーザー名"), { target: { value: "tanitune" } });
  //   fireEvent.input(screen.getByLabelText("メールアドレス"), { target: { value: "tani@example.com" } });
  //   fireEvent.input(screen.getByLabelText("パスワード"), { target: { value: "password123" } });
  //   fireEvent.input(screen.getByLabelText("パスワード確認"), { target: { value: "password123" } });

  //   fireEvent.click(screen.getByRole("button", { name: "更新" }));

  //   jest.advanceTimersByTime(1500);

  //   await waitFor(() => {
  //     expect(setTimeout).toHaveBeenCalledTimes(1);
  //     expect(setTimeout).toHaveBeenCalledWith(expect.any(Function),1500);
  //     expect(screen.getByText("編集が完了しました！")).toBeInTheDocument();
  //     expect(push).toHaveBeenCalledWith("/mypage");
  //   });

  //   jest.useRealTimers();
  // });

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
