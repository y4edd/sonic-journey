import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";
import { UseFormRegisterReturn } from "react-hook-form";

describe("FormInput コンポーネントの単体テスト", () => {
  // register のモック
  const mockRegister: UseFormRegisterReturn = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: "username",
  };

  it("ラベルと入力フィールドが正しく表示される", () => {
    render(
      <FormInput
        label="ユーザー名"
        id="username"
        type="text"
        placeholder="名前を入力してください"
        register={mockRegister}
        error={undefined}
      />
    );

    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("名前を入力してください")).toBeInTheDocument();
  });

  it("エラーメッセージが表示されない", () => {
    render(
      <FormInput
        label="メールアドレス"
        id="email"
        type="email"
        placeholder="メールを入力してください"
        register={mockRegister}
        error={undefined}
      />
    );

    const errorMessage = screen.queryByText("必須です");
    expect(errorMessage).toBeNull();
  });

  it("エラーメッセージが表示される", () => {
    render(
      <FormInput
        label="パスワード"
        id="password"
        type="password"
        placeholder="パスワードを入力してください"
        register={mockRegister}
        error={{ message: "パスワードは必須です",type: "required" }}
      />
    );

    expect(screen.getByText("パスワードは必須です")).toBeInTheDocument();
  });

  it("入力イベントが正しくトリガーされる", () => {
    render(
      <FormInput
        label="ユーザー名"
        id="username"
        type="text"
        placeholder="名前を入力してください"
        register={mockRegister}
        error={undefined}
      />
    );

    const inputElement = screen.getByLabelText("ユーザー名");

    fireEvent.change(inputElement, { target: { value: "tanitune" } });
    expect(inputElement).toHaveValue("tanitune");
  });
});
