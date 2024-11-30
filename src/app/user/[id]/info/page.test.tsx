import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Info from "./page";
import { fetchUser, fetchUserInfo } from "@/utils/apiFunc";

// next/navigationモジュール全体、useRouter、pushのモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/utils/apiFunc", () => ({
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

describe("Infoコンポーネントのテスト", () => {
  test("初期表示時に「Loading...」が表示される", () => {
    render(<Info />);

    const text = screen.getByText("Loading...");
    expect(text).toBeInTheDocument;
  });

  test("ログインしていない場合、UnauthorizedAccessが表示される", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve(null));
    (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.resolve(null));

    render(<Info />);
    await waitFor(() => {
      expect(
        screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "ログインページへ移動" })).toBeInTheDocument();
    });
  });

  test("ログイン済みの場合、アカウント情報が表示される", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "12huh" }));
    (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.resolve({ name: "test", email: "test@ttt.com" }));

    render(<Info />);

    await waitFor(() => {
      expect(screen.getByText("test"));
      expect(screen.getByText("test@ttt.com"));
    });
  });

  test("編集ボタンをクリックすると、編集ページに遷移する", async () => {
    (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "12huh" }));
    (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.resolve({ name: "test", email: "test@ttt.com" }));

    const pushMock = jest.fn();
    require("next/navigation").useRouter.mockReturnValue({
      push: pushMock,
    });

    render(<Info />);

    await waitFor(() => {
      const editButton = screen.getByRole("button", { name: "編集" });
      fireEvent.click(editButton);
      expect(pushMock).toHaveBeenCalledWith("/user/12huh/edit");
    });
  });

    test("戻るボタンをクリックすると、mypageに遷移する", async () => {
      (fetchUser as jest.Mock).mockImplementation(() => Promise.resolve({ id: "12huh" }));
      (fetchUserInfo as jest.Mock).mockImplementation(() => Promise.resolve({ name: "test", email: "test@ttt.com" }));
  
      const pushMock = jest.fn();
      require("next/navigation").useRouter.mockReturnValue({
        push: pushMock,
      });
  
      render(<Info />);
  
      await waitFor(() => {
        const backButton = screen.getByRole("button", { name: "戻る" });
        fireEvent.click(backButton);
        expect(pushMock).toHaveBeenCalledWith("/mypage");
      });
    });
});
