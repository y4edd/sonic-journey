import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import UnAuthenticated from "./invalid";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UnAuthenticatedコンポーネントのテスト", () => {
  test("ボタンとメッセージが表示される", () => {
    render(<UnAuthenticated />);

    expect(
      screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "ログインページへ移動" });
    expect(button).toBeInTheDocument();
  });

  test("ボタン押下時、ログインページへ移動する", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<UnAuthenticated />);

    const button = screen.getByRole("button", { name: "ログインページへ移動" });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/user/login");
  });
});
