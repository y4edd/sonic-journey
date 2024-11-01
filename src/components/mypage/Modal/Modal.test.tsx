import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

// useRouterをモック
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Modalコンポーネントのテスト", () => {
  beforeAll(() => {
    // dialogRefのshowModalメソッドをモック
    HTMLDialogElement.prototype.showModal = jest.fn();

    // テストの前に 'modal-root' 要素を追加
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    cleanup();
  });

  test("Modalコンポーネントで囲んだ要素がレンダリングされること", () => {
    render(
      <Modal>
        <p>テストコンテンツ</p>
      </Modal>,
    );
    expect(screen.getByText("テストコンテンツ")).toBeInTheDocument();
  });

  test("xボタンを押下するとモーダルが閉じること", () => {
    // router.back() のモック
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });

    render(
      <Modal>
        <p>テストコンテンツ</p>
      </Modal>,
    );

    const closeButton = screen.getByRole("button", { hidden: true });
    fireEvent.click(closeButton);
    expect(mockBack).toHaveBeenCalled();
  });

  test("idに modal-root を持つ要素がないとき、何もレンダリングされないこと", () => {
    document.getElementById("modal-root")?.remove();

    render(
      <Modal>
        <p>テストコンテンツ</p>
      </Modal>,
    );

    expect(screen.queryByText("テストコンテンツ")).toBeNull();
  });
});
