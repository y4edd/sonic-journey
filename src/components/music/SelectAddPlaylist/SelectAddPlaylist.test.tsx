import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SelectAddPlaylist } from "./SelectAddPlaylist";
import React from "react";

const mockSetModalOpen = jest.fn();
const props = {
  music_id: 2,
  playlists: [
    {
      name: "睡眠用",
      id: 3,
      user_id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "勉強用",
      id: 4,
      user_id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  defaultPlaylists: [
    {
      playlist_id: 3,
      music_flag: false,
    },
    {
      playlist_id: 4,
      music_flag: true,
    },
  ],
  setModalOpen: mockSetModalOpen,
};

describe("SelectAddPlaylistの単体テスト", () => {
  test("レンダリングが適切に行われていること", () => {
    render(<SelectAddPlaylist {...props} />);
    expect(screen.getByText("楽曲の追加先")).toBeInTheDocument();
    expect(screen.getByText("睡眠用")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "プレイリストを新規作成" })
    ).toBeInTheDocument();
  });

  test("キャンセルボタンを押すとモーダルの開閉を管理する状態変数が呼び出されること", () => {
    render(<SelectAddPlaylist {...props} />);
    const cancelButton = screen.getByRole("button", { name: "キャンセル" });
    fireEvent.click(cancelButton);

    expect(mockSetModalOpen).toHaveBeenCalled();
  });

  test("楽曲追加ボタンを押すとモーダルの開閉を管理する状態変数が呼び出されること", () => {
    render(<SelectAddPlaylist {...props} />);
    const addButton = screen.getByRole("button", { name: "追加" });
    fireEvent.click(addButton);

    expect(mockSetModalOpen).toHaveBeenCalled();
  });

  test("プレイリストのチェックボックスの初期状態が適切に入力されていること", () => {
    render(<SelectAddPlaylist {...props} />);

    expect(screen.getByLabelText("睡眠用")).not.toBeChecked();
    expect(screen.getByLabelText("勉強用")).toBeChecked();
  });

  test("プレイリストのチェックボックスをチェックした時、入力状態が適切であること", () => {
    render(<SelectAddPlaylist {...props} />);

    const sleep = screen.getByLabelText("睡眠用");
    const study = screen.getByLabelText("勉強用");

    fireEvent.click(sleep);
    fireEvent.click(study);
    expect(screen.getByLabelText("睡眠用")).toBeChecked();
    expect(screen.getByLabelText("勉強用")).not.toBeChecked();
  });
});
