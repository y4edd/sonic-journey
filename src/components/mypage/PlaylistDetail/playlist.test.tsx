import { render, screen } from "@testing-library/react";
import { PlaylistHeader } from "./PlaylistHeader/PlaylistHeader";

describe("PlaylistHeaderの単体テスト", () => {
  test("レンダリングが適切に行われていること", () => {
    render(<PlaylistHeader playlistTitle="睡眠用" playlistId={1} />);
    expect(screen.getByText("睡眠用")).toBeInTheDocument();
  });
});
