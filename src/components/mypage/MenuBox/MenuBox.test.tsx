import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { render, screen } from "@testing-library/react";
import MenuBox from "./MenuBox";

describe("MenuBoxコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映し、レンダリングされること", () => {
    render(
      <MenuBox
        mainTitle="メインタイトル"
        subTitle="サブタイトル"
        icon={<AccountBoxIcon data-testid="icon-element" />}
      />,
    );
    expect(screen.getByText("メインタイトル")).toBeInTheDocument();
    expect(screen.getByText("サブタイトル")).toBeInTheDocument();
    expect(screen.getByTestId("icon-element")).toBeInTheDocument();
  });
});
