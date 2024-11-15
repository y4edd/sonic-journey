import { Preview } from "@mui/icons-material";
import { render, screen } from "@testing-library/react";
import SongInfoContent from "./SongInfoContent";

// SongAudioコンポーネントをモック
jest.mock("../SongAudio/SongAudio", () => ({
  __esModule: true,
  default: ({ preview }: { preview?: string }) => (
    <div data-testid="song-audio">
      {preview ? `SongAudio with preview: ${preview}` : "SongAudio without preview"}
    </div>
  ),
}));

// CreateNewFolderIconをモック
jest.mock("@mui/icons-material/CreateNewFolder", () => ({
  __esModule: true,
  default: () => <svg data-testid="create-new-folder-icon" />,
}));

describe("SongInfoContent", () => {
  const testProps = {
    id: 1,
    title: "ALONES",
    artist: "Aquatimez",
    image: "example.jpeg",
    preview: "https://example.com/test-preview.mp3",
  };

  const noPreviewProps = {
    ...testProps,
    preview: undefined,
  };

  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(<SongInfoContent {...testProps} />);
    expect(screen.getByText("ALONES")).toBeInTheDocument();
    expect(screen.getByText("Aquatimez")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "ALONESのジャケット");
    expect(screen.getByText("プレイリストに追加")).toBeInTheDocument();
  });

  test("previewがpropsで渡されなくても、レンダリングされること", () => {
    render(<SongInfoContent {...noPreviewProps} />);
    expect(screen.getByText("ALONES")).toBeInTheDocument();
    expect(screen.getByText("Aquatimez")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "ALONESのジャケット");
    expect(screen.getByText("プレイリストに追加")).toBeInTheDocument();
  });
});
