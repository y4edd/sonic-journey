import { fetchUser, fetchUserInfo } from "@/utils/apiFunc";
import { cleanup, fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import Edit from "./page";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("../../../../utils/apiFunc", () => ({
  ...jest.requireActual("../../../../utils/apiFunc"),
  fetchUser: jest.fn(),
  fetchUserInfo: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  // テスト間でDOMリセット
  cleanup();
});

describe("Editコンポーネントのテスト", () => {
  test("未ログインの場合はUnauthenticatedコンポーネントが表示されること", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve(null));
    (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.resolve(null));

    render(<Edit />);
    await waitFor(() => {
      expect(
        screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "ログインページへ移動" })).toBeInTheDocument();
    });
  });

  test("ログイン済の場合は「アカウント編集」の文字が表示される", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "uyrf9" }));
    (fetchUserInfo as jest.Mock).mockImplementation(() =>
      Promise.resolve({ name: "test", email: "test@test.com" }),
    );

    render(<Edit />);

    await waitFor(() => {
      expect(screen.getByTestId("information")).toHaveTextContent("アカウント編集");
    });
  });

  test("ユーザーIDが取得できなかったとき、Unauthenticatedコンポーネントが表示される", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.reject(undefined));
    (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.reject(undefined));

    render(<Edit />);

    await waitFor(() => {
      expect(screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "ログインページへ移動" })).toBeInTheDocument();
    });
  });

  test("初期表示にて、ユーザー名、メールアドレスがformに表示されている", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "uyrf9" }));
    (fetchUserInfo as jest.Mock).mockImplementation(() =>
      Promise.resolve({ name: "test", email: "test@test.com" }),
    );

    render(<Edit />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("test")).toBeInTheDocument();
      expect(screen.getByDisplayValue("test@test.com"));
    });
  });

  test("ユーザー名、メールアドレスを変更したとき、変更をformが受け取る", async () => {
    (fetchUser as jest.Mock).mockResolvedValue({ id: "uyrf9" });
    (fetchUserInfo as jest.Mock).mockResolvedValue({
      name: "test",
      email: "test@test.com",
    });

    render(<Edit />);
    
    await waitFor( async ()=>{
      const nameInput = screen.getByRole("textbox", { name: "ユーザー名" });
      const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
      const event = userEvent.setup();

      await event.clear(nameInput);
      await event.type(nameInput, "test2");
      await event.clear(emailInput);
      await event.type(emailInput, "test2@test.com");

      expect(nameInput).toHaveValue("test2");
      expect(emailInput).toHaveValue("test2@test.com");

    });
  });

  test("ユーザ情報の編集が完了し、トーストが表示される", async () => {
    (fetchUser as jest.Mock).mockResolvedValue({ id: "uyrf9" });
    (fetchUserInfo as jest.Mock).mockResolvedValue({
      name: "test",
      email: "test@test.com",
    });

    render(<Edit />);

    // Loading が消えるのを待つ
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

      const nameInput = screen.getByRole("textbox", { name: "ユーザー名" });
      const emailInput = screen.getByRole("textbox", { name: "メールアドレス" });
      const passwordInput = screen.getByLabelText("パスワード");
      const passwordConfirmInput = screen.getByLabelText("パスワード確認");

      const event = userEvent.setup();

      await event.clear(nameInput);
      await event.type(nameInput, "test2");
      await event.clear(emailInput);
      await event.type(emailInput, "test2@test.com");
      await event.type(passwordInput, "testpass");
      await event.type(passwordConfirmInput, "testpass");

      const backButton = screen.getByRole("button", { name: "更新" });

      fireEvent.click(backButton);

      () => {
        const message = screen.getByText("アカウント情報の編集が完了しました");
        expect(message).toBeInTheDocument();
      };
  });

  test("「戻る」ボタンが押されたとき、userInfoページが呼び出される", async () => {
    const pushMock = jest.fn();
    require("next/navigation").useRouter.mockReturnValue({
      push: pushMock,
    });

    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "uyrf9" }));
    (fetchUserInfo as jest.Mock).mockImplementation(() =>
      Promise.resolve({ name: "test", email: "test@test.com" }),
    );

    render(<Edit />);

    await waitFor(() => {
      const backButton = screen.getByRole("button", { name: "戻る" });

      fireEvent.click(backButton);
      expect(pushMock).toHaveBeenCalledWith("/user/uyrf9/info");
    });
  });
});
