import { render, screen } from "@testing-library/react";
import BreadList from "./BreadList";

describe("BreadListコンポーネントの単体テスト", () => {
  test("受け取ったpropsを反映して、レンダリングされるか", () => {
    render(
      <BreadList
        bread={[
          { link: "/", title: "TOP" },
          { link: "/", title: "アーティスト" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "TOP" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "アーティスト" })).toBeInTheDocument();
  });
});
