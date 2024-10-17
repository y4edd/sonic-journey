import { useFreeWordSearch } from "@/hooks/top/useFreeWordSearch";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    query: {},
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
  usePathname: jest.fn(() => "/mocked-path"),
}));

jest.mock("@/hooks/top/useFreeWordSearch");
jest.mock("next/link", () => {
  return ({ children }: { children: string }) => {
    return children;
  };
});

jest.mock("next/image", () => {
  return (props: {
    src: string;
    alt: string;
    height: number;
    width: number;
  }) => {
    return <img {...props} alt={props.alt} />;
  };
});
jest.mock("./HamburgerMenu", () => ({
  HamburgerMenu: () => <div data-testid="hamburger-menu">HamburgerMenu</div>,
}));
jest.mock("./PageHeadingList", () => ({
  PageHeadingList: () => <div data-testid="page-heading-list">PageHeadingList</div>,
}));

describe("ヘッダーコンポーネントの単体テスト", () => {
  const mockHandleForm = jest.fn();
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    (useFreeWordSearch as jest.Mock).mockReturnValue({
      handleForm: mockHandleForm,
      handleChange: mockHandleChange,
      error: "",
      freeWord: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("初期レンダリングにおいてハンバーガーメニュー、サイトロゴ、検索アイコン、見出しが表示される", () => {
    render(<Header />);

    expect(screen.getByTestId("hamburger-menu")).toBeInTheDocument();

    const logo = screen.getByAltText("header-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/yaetunes_logo_transparent.png");

    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
    expect(screen.getByTestId("page-heading-list")).toBeInTheDocument;
  });

  test("検索アイコンを押すと検索バーが表示される", () => {
    render(<Header />);
    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);

    const input = screen.getByPlaceholderText("アーティスト・アルバム・楽曲で検索");
    expect(input).toBeInTheDocument();
    expect(screen.getByText("キャンセル")).toBeInTheDocument();
  });

  test("未入力状態で検索をかけるとplaceholderに「検索ワードを入力してください。」と表示される", async () => {
    (useFreeWordSearch as jest.Mock).mockReturnValue({
      handleForm: mockHandleForm,
      handleChange: mockHandleChange,
      error: "検索ワードを入力してください。",
      freeWord: "",
    });

    render(<Header />);
    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);

    expect(screen.getByPlaceholderText("検索ワードを入力してください。")).toBeInTheDocument();
  });

  test("検索キャンセルボタンをクリックすると検索フォームが非表示になる", () => {
    render(<Header />);
    const searchIcon = screen.getByTestId("search-icon");
    fireEvent.click(searchIcon);

    const searchCancel = screen.getByText("キャンセル");
    fireEvent.click(searchCancel);

    expect(screen.getByTestId("hamburger-menu")).toBeInTheDocument();
  });
});
