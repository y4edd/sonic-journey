import DeleteConfirm from "./DeleteConfirm";
import { fireEvent, render, screen } from "@testing-library/react";

describe ("DeleteConfirmコンポーネントのテスト", () => {
  
  const choiceDeleteMock = jest.fn();
  const deleteProcessing = false;
  const cancelDeleteMock = jest.fn();

  // UI
  test("モーダルの警告メッセージが正しく表示される", () => {
    render(<DeleteConfirm choiceDelete={choiceDeleteMock} deleteProcessing={deleteProcessing} cancelDelete={cancelDeleteMock} />);
    const warning = screen.getByText("本当に退会しますか？");
    expect(warning).toBeInTheDocument();
  })

  test("削除確認メッセージが正しく表示される", () => {
    render(<DeleteConfirm choiceDelete={choiceDeleteMock} deleteProcessing={deleteProcessing} cancelDelete={cancelDeleteMock} />);
    const message = screen.getByText("このアカウントのデータ及び、プレイリストはすべて削除されます");
    expect(message).toBeInTheDocument();
  });
  // ボタンの動作
  test("「退会する」ボタンがクリックされたときに適切な関数が呼び出される", () => {
    render(<DeleteConfirm choiceDelete={choiceDeleteMock} deleteProcessing={deleteProcessing} cancelDelete={cancelDeleteMock} />);
    const deleteButton = screen.getByRole("button",{name:"退会する"});
    fireEvent.click(deleteButton);
    expect(choiceDeleteMock).toHaveBeenCalled();
  })

  test("「キャンセル」ボタンがクリックされたときに適切な関数が呼び出される", () => {
    render(<DeleteConfirm choiceDelete={choiceDeleteMock} deleteProcessing={deleteProcessing} cancelDelete={cancelDeleteMock} />);
    const cancelButton = screen.getByRole("button",{name:"キャンセル"});
    fireEvent.click(cancelButton);
    expect(cancelDeleteMock).toHaveBeenCalled();
  })
})
