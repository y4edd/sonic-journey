import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserRegistration from "./page";

// モックの設定
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// userRegister、onSubmitをモック化
jest.mock("../../../hooks/useRegister", () => ({
  userRegister: jest.fn(() => ({
    onSubmit: jest.fn(),
  })) 
}));

describe("UserRegistrationコンポーネントのテスト", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setUp = () => {
    render(<UserRegistration />);
    const submitButton = screen.getByRole("button",{name:"ユーザー登録"});
    return {submitButton}; 
  };

  test("フォームが正しくレンダリングされている", () => {
    render(<UserRegistration />);
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
  });

  test("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    const { submitButton } = setUp();
    fireEvent.click(submitButton);

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
});
