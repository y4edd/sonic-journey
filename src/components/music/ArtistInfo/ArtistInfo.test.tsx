import { render, screen } from "@testing-library/react";
import ArtistInfo from "./ArtistInfo";

jest.mock("../../../utils/apiFunc", () => ({
  fetchUser: jest.fn().mockImplementation(() => "userId"),
  getFavoriteArtistsForFav: jest.fn().mockImplementation(() => ({
    resultData: [{ artistId: 7878479, updatedAt: new Date() }],
  })),
}));

afterAll(() => {
  jest.restoreAllMocks();
});
describe("ArtistInfoコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングすること", () => {
    render(<ArtistInfo image="example.jpg" name="bluuuue" id={64} />);
    expect(screen.getByText("bluuuue")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "example.jpg");
  });
});
