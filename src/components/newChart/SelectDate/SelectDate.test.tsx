import { render, screen } from "@testing-library/react";
import { SelectDate } from "./SelectDate";
import "@testing-library/jest-dom";
import { GETMONDAYOFLASTWEEK, GETMONDAYOFTHISWEEK } from "@/constants/constant";

const handleLastClick = jest.fn();
const handleThisClick = jest.fn();

describe("LayoutIconコンポーネントの単体テスト", () => {
  test("レイアウト変更アイコンが表示される", () => {
    const options = { month: "2-digit" as const, day: "2-digit" as const };
    const lastMondayDate = GETMONDAYOFLASTWEEK.toLocaleDateString(undefined, options);
    const thisMondayDate = GETMONDAYOFTHISWEEK.toLocaleDateString(undefined, options);
    render(
      <SelectDate
        weekCheck="all"
        handleLastClick={handleLastClick}
        handleThisClick={handleThisClick}
      />,
    );

    const lastMonday = screen.getByText("先週");
    const thisMonday = screen.getByText("今週");

    expect(lastMonday).toBeInTheDocument;
    expect(screen.getAllByText(`(${lastMondayDate}~)`)).toBeInTheDocument;
    expect(thisMonday).toBeInTheDocument;
    expect(screen.getAllByText(`(${thisMondayDate}~)`)).toBeInTheDocument;
  });

  test("全表示を選択時、日付表示が両週とも灰色になる", () => {
    render(
      <SelectDate
        weekCheck="all"
        handleLastClick={handleLastClick}
        handleThisClick={handleThisClick}
      />,
    );
    const lastMonday = screen.getByText("先週");
    const thisMonday = screen.getByText("今週");

    expect(lastMonday).toHaveClass("otherWeek");
    expect(thisMonday).toHaveClass("otherWeek");
  });
  test("先週分の新曲を選択時、先週分の日付表示が黒色に、今週分の日付表示が灰色になる", () => {
    render(
      <SelectDate
        weekCheck="last"
        handleLastClick={handleLastClick}
        handleThisClick={handleThisClick}
      />,
    );
    const lastMonday = screen.getByText("先週");
    const thisMonday = screen.getByText("今週");

    expect(lastMonday).toHaveClass("theWeek");
    expect(thisMonday).toHaveClass("otherWeek");
  });
  test("今週分の新曲を選択時、先週分の日付表示が灰色に、今週分の日付表示が黒色になる", () => {
    render(
      <SelectDate
        weekCheck="this"
        handleLastClick={handleLastClick}
        handleThisClick={handleThisClick}
      />,
    );
    const lastMonday = screen.getByText("先週");
    const thisMonday = screen.getByText("今週");

    expect(lastMonday).toHaveClass("otherWeek");
    expect(thisMonday).toHaveClass("theWeek");
  });
});
