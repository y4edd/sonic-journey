import type { FormData } from "@/types/user";
import { fireEvent, render, screen } from "@testing-library/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";

const TestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="ユーザー名"
        id="userName"
        type="text"
        name="name"
        placeholder="名前を入力してください"
        register={register}
        error={errors.name}
      />
      <button type="submit">送信</button>
    </form>
  );
};

describe("FormInput コンポーネントのテスト", () => {
  test("ユーザー名の入力フィールドが正しく表示される", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("名前を入力してください")).toBeInTheDocument();
  });

  test("入力イベントが正しく動作する", () => {
    render(<TestForm />);

    const input = screen.getByLabelText("ユーザー名");
    fireEvent.change(input, { target: { value: "tanitune" } });

    expect(input).toHaveValue("tanitune");
  });
});
