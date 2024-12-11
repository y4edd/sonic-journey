import { render, screen } from "@testing-library/react";
import { LayoutIcon } from "./LayoutIcon";
import "@testing-library/jest-dom";

const handleGridLayoutIconClick = jest.fn();
const handleListLayoutIconClick = jest.fn();

describe("LayoutIconコンポーネントの単体テスト", () => {
  test("レイアウト変更アイコンが表示される", () => {
    render(
      <LayoutIcon
        gridLayout={true}
        handleGridLayoutIconClick={handleGridLayoutIconClick}
        handleListLayoutIconClick={handleListLayoutIconClick}
      />,
    );

    expect(screen.getByTestId("ViewModuleIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ViewListIcon")).toBeInTheDocument();
  });

  test("リストアイコンをクリックするとグリッドアイコンが灰色に切り替わる", () => {
    render(
      <LayoutIcon
        gridLayout={true}
        handleGridLayoutIconClick={handleGridLayoutIconClick}
        handleListLayoutIconClick={handleListLayoutIconClick}
      />,
    );

    const listIcon = screen.getByTestId("ViewListIcon");
    const gridIcon = screen.getByTestId("ViewModuleIcon");

    expect(gridIcon).toHaveClass("gridOn");
    expect(listIcon).toHaveClass("gridOff");
  });
  test("グリッドアイコンをクリックするとリストアイコンが灰色に切り替わる", () => {
    render(
      <LayoutIcon
        gridLayout={false}
        handleGridLayoutIconClick={handleGridLayoutIconClick}
        handleListLayoutIconClick={handleListLayoutIconClick}
      />,
    );

    const listIcon = screen.getByTestId("ViewListIcon");
    const gridIcon = screen.getByTestId("ViewModuleIcon");

    expect(gridIcon).toHaveClass("gridOff");
    expect(listIcon).toHaveClass("gridOn");
  });
});
