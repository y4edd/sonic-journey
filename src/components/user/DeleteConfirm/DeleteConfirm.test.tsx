import { fireEvent, render, screen } from "@testing-library/react";
import DeleteConfirm from "./DeleteConfirm";

describe("DeleteConfirmコンポーネントのテスト", () => {
  const choiceDeleteMock = jest.fn();
  const isButtonDisabled = false;
  const cancelDeleteMock = jest.fn();

  test("モーダルの警告メッセージが正しく表示される", () => {
    render(
      <DeleteConfirm
        choiceDelete={choiceDeleteMock}
        isButtonDisabled={isButtonDisabled}
        cancelDelete={cancelDeleteMock}
      />,
    );
    const warning = screen.getByText("本当に退会しますか？");
    expect(warning).toBeInTheDocument();
  });

  test("削除確認メッセージが正しく表示される", () => {
    render(
      <DeleteConfirm
        choiceDelete={choiceDeleteMock}
        isButtonDisabled={isButtonDisabled}
        cancelDelete={cancelDeleteMock}
      />,
    );
    const message = screen.getByText(
      "このアカウントのデータ及び、プレイリストはすべて削除されます",
    );
    expect(message).toBeInTheDocument();
  });
  test("「退会する」ボタンがクリックされたときに適切な関数が呼び出される", () => {
    render(
      <DeleteConfirm
        choiceDelete={choiceDeleteMock}
        isButtonDisabled={isButtonDisabled}
        cancelDelete={cancelDeleteMock}
      />,
    );
    const deleteButton = screen.getByRole("button", { name: "退会する" });
    fireEvent.click(deleteButton);
    expect(choiceDeleteMock).toHaveBeenCalled();
  });

  test("「キャンセル」ボタンがクリックされたときに適切な関数が呼び出される", () => {
    render(
      <DeleteConfirm
        choiceDelete={choiceDeleteMock}
        isButtonDisabled={isButtonDisabled}
        cancelDelete={cancelDeleteMock}
      />,
    );
    const cancelButton = screen.getByRole("button", { name: "キャンセル" });
    fireEvent.click(cancelButton);
    expect(cancelDeleteMock).toHaveBeenCalled();
  });
});
