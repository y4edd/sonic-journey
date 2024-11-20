import { render,screen } from "@testing-library/react";
import UserDetail from "./UserDetail";

describe("UserDetailコンポーネントのテスト", () => {
  test("渡されたテキストが正しく表示されている", () => {
    const label = "ユーザー名";
    const userData = "pom"
    render(<UserDetail label={label} userData={userData} />,);

    const element = screen.getByText(label);
    expect(element).toBeInTheDocument();
  });
});
