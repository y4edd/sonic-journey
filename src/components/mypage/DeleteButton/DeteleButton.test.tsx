import { deletePlayHistory } from "@/utils/history";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    mockDeletePlayHistory.mockResolvedValueOnce({ success: true });

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDeletePlayHistory).toHaveBeenCalledWith(userId);
    });
  });

  test("削除成功時にrouter.refreshが呼ばれる", async () => {
    mockDeletePlayHistory.mockResolvedValueOnce({ success: true });

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  test("削除失敗時にアラートが表示される", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    mockDeletePlayHistory.mockResolvedValueOnce(null);

    render(<DeleteButton userId={userId} />);
    const button = screen.getByRole("button", { name: "履歴を削除" });

    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("再生履歴の削除に失敗しました");
    });

    alertMock.mockRestore();
  });
});
