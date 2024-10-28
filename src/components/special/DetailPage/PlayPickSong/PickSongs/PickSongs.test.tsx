// import { render, screen } from "@testing-library/react";
// import PickSongs from "./PickSongs";

// describe("AlbumSingleSongコンポーネントの単体テスト", () => {
//   test("受け取ったpropsを反映し、正しくレンダリングすること", () => {
//     render(<PickSongs id={1} num={1} title="タイトル" preview="example.com" />);
//     expect(screen.getByText("タイトル")).toBeInTheDocument();
//     expect(
//       screen.queryByText("プレビューが読み込めません")
//     ).not.toBeInTheDocument();
//     expect(screen.getByRole("button")).toBeInTheDocument();
//     expect(screen.getByRole("link")).toHaveAttribute("href", "/music/1");
//   });
//   test("previewがなかった場合に、その旨が表示されること", () => {
//     render(<PickSongs id={1} num={1} title="タイトル" preview="" />);
//     expect(screen.getByText("プレビューが読み込めません")).toBeInTheDocument();
//   });
//   test("numの値が9より大きい場合、先頭に0が付かないこと", () => {
//     render(
//       <PickSongs id={1} num={15} title="タイトル" preview="example.com" />
//     );
//     expect(screen.getByText("タイトル")).toBeInTheDocument();
//   });
// });
