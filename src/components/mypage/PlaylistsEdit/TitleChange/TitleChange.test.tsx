import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TitleChange } from "./TitleChange";

describe("TitleChangeコンポーネントの単体テスト", () => {
  const playlist = {
    id: 1,
    name: "勉強用",
    user_id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockSetTitleChangeFlag = jest.fn();
  const index = 0;

  it("レンダリングが適切に行われていること", () => {
    render(
      <TitleChange playlist={playlist} setTitleChangeFlag={mockSetTitleChangeFlag} index={index} />,
    );

    expect(screen.getByPlaceholderText("勉強用")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "cancel" })).toBeInTheDocument();
  });

  it("キャンセルボタンを押した際にtitleChangeFlag(状態関数)が書き換わる", () => {
    render(
      <TitleChange playlist={playlist} setTitleChangeFlag={mockSetTitleChangeFlag} index={index} />,
    );

    const cancelButton = screen.getByRole("button", { name: "cancel" });
    fireEvent.click(cancelButton);

    expect(mockSetTitleChangeFlag).toHaveBeenCalled();
  });

  it("プレイリスト名が未入力の状態で変更ボタンを押したときにエラーメッセージが表示される", async () => {
    render(
      <TitleChange playlist={playlist} setTitleChangeFlag={mockSetTitleChangeFlag} index={index} />,
    );

    const submitButton = screen.getByRole("button", { name: "submit" });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("プレイリスト名を入力してください");
    expect(errorMessage).toBeInTheDocument();
  });
});
