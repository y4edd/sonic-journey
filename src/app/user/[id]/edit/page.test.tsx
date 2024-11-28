import { fetchUser, fetchUserInfo } from "@/utils/apiFunc";
import { render, screen, waitFor } from "@testing-library/react";
import Edit from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    router: "/",
    pathname: "user/id/info",
    query: { id: "uyrf9" },
    asPath: "",
  })),
}));

jest.mock("../../../../utils/apiFunc", () => ({
  ...jest.requireActual("../../../../utils/apiFunc"),
  fetchUser: jest.fn(),
  fetchUserInfo: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
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
});
