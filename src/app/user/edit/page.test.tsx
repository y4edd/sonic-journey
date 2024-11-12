import { render, screen, waitFor } from "@testing-library/react";
import Edit from "./page";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Editコンポーネントのテスト", () => {
  test("未ログインの場合はUnauthenticatedコンポーネントが表示されること", async () => {
    render(<Edit />);
    await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

    expect(
      screen.getByText(/不正な画面遷移です.*下記ボタンよりログインしてください/),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ログイン" })).toBeInTheDocument();
  });
});
