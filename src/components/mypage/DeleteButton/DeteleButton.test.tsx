import { deletePlayHistory } from "@/utils/history";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";

// deletePlayHistoryをモック化
jest.mock("@/utils/history", () => ({
  deletePlayHistory: jest.fn(),
}));

// useRouterをモック化
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("DeleteButtonコンポーネントの単体テスト", () => {
  const mockDeletePlayHistory = deletePlayHistory as jest.Mock;
  const mockRouter = { refresh: jest.fn() };
  const userId = "test1234";

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
  test("削除ボタンがレンダリングされること", () => {
    render(<DeleteButton userId={userId} />);
    expect(screen.getByRole("button", { name: "履歴を削除" })).toBeInTheDocument();
  });

  test("クリック時にdeletePlayHistory関数が呼ばれる", async () => {
    mockDeletePlayHistory.mockResolvedValueOnce(null);

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    userEvent.click(button);

    await waitFor(() => {
      expect(mockDeletePlayHistory).toHaveBeenCalledWith(userId);
    });
  });

  test("削除成功時にrouter.refreshが呼ばれる", async () => {
    mockDeletePlayHistory.mockResolvedValueOnce(null);

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    userEvent.click(button);

    await waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  test("削除失敗時にエラーをキャッチする", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockDeletePlayHistory.mockRejectedValueOnce(new Error("Error"));

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    userEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
