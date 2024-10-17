// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { useRouter } from "next/navigation";
// import UserRegistration from "./page";

// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));

// const mockRegisterUser = jest.fn();

// jest.mock("./path/to/registerUser", () => ({
//   registerUser: (data: FormData) => mockRegisterUser(data),
// }));

// describe("UserRegistration", () => {
//   const mockPush = jest.fn();

//   beforeEach(() => {
//     (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
//     mockRegisterUser.mockReset();
//   });

//   it("フォームが正しくレンダリングされている", () => {
//     render(<UserRegistration />);
//     expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
//     expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
//     expect(screen.getByLabelText("パスワード入力")).toBeInTheDocument();
//     expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
//   });

//   it("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
//     render(<UserRegistration />);
//     fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

//     await waitFor(() => {
//       expect(screen.getByText("ユーザー名は必須です")).toBeInTheDocument();
//       expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
//       expect(screen.getByText("パスワードは6文字以上で入力してください")).toBeInTheDocument();
//     });
//   });

//   it("パスワードが一致しない場合、エラーメッセージが表示される", async () => {
//     render(<UserRegistration />);

//     fireEvent.input(screen.getByLabelText("パスワード入力"), {
//       target: { value: "password1" },
//     });
//     fireEvent.input(screen.getByLabelText("パスワード確認"), {
//       target: { value: "password2" },
//     });

//     fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

//     await waitFor(() => {
//       expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
//     });
//   });

//   it("正しい入力の場合、ページ遷移が行われる", async () => {
//     render(<UserRegistration />);

//     fireEvent.input(screen.getByLabelText("ユーザー名"), {
//       target: { value: "tanitune" },
//     });
//     fireEvent.input(screen.getByLabelText("メールアドレス"), {
//       target: { value: "tanisan@example.com" },
//     });
//     fireEvent.input(screen.getByLabelText("パスワード入力"), {
//       target: { value: "password" },
//     });
//     fireEvent.input(screen.getByLabelText("パスワード確認"), {
//       target: { value: "password" },
//     });

//     fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

//     await waitFor(() => {
//       expect(mockPush).toHaveBeenCalledWith("/user/login");
//     });
//   });

//   it("サーバーエラーが発生した場合、エラーメッセージが表示される", async () => {
//     // サーバーエラーを再現するため、mockRejectedValueOnce を使用
//     mockRegisterUser.mockRejectedValueOnce(new Error("サーバーエラーです"));

//     render(<UserRegistration />);

//     fireEvent.input(screen.getByLabelText("ユーザー名"), {
//       target: { value: "tanitune" },
//     });
//     fireEvent.input(screen.getByLabelText("メールアドレス"), {
//       target: { value: "tanisan@example.com" },
//     });
//     fireEvent.input(screen.getByLabelText("パスワード入力"), {
//       target: { value: "password" },
//     });
//     fireEvent.input(screen.getByLabelText("パスワード確認"), {
//       target: { value: "password" },
//     });

//     fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

//     await waitFor(() => {
//       expect(screen.getByText("サーバーエラーです")).toBeInTheDocument();
//     });
//   });
// });

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import UserRegistration from "./page";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(20),
  mailAddress: z.string().email(),
  password: z.string().min(6),
  passwordConfirm: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

const mockRegisterUser = jest.fn<Promise<void>, [FormValues]>();

jest.mock("./path/to/registerUser", () => ({
  registerUser: (data: FormValues) => mockRegisterUser(data),
}));

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("UserRegistration", () => {
  beforeEach(() => {
    mockRegisterUser.mockReset();
  });

  it("フォームが正しくレンダリングされている", () => {
    render(<UserRegistration />);
    expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード入力")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード確認")).toBeInTheDocument();
  });

  it("必須フィールドが空の場合、エラーメッセージが表示される", async () => {
    render(<UserRegistration />);
    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(screen.getByText("ユーザー名は必須です")).toBeInTheDocument();
      expect(screen.getByText("正しいメールアドレスを入力してください")).toBeInTheDocument();
      expect(screen.getByText("パスワードは6文字以上で入力してください")).toBeInTheDocument();
    });
  });

  it("パスワードが一致しない場合、エラーメッセージが表示される", async () => {
    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("パスワード入力"), {
      target: { value: "password1" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password2" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません")).toBeInTheDocument();
    });
  });

  it("正しい入力の場合、ページ遷移が行われる", async () => {
    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("ユーザー名"), {
      target: { value: "tanitune" },
    });
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tanisan@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード入力"), {
      target: { value: "password" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/user/login");
    });
  });

  it("サーバーエラーが発生した場合、エラーメッセージが表示される", async () => {
    mockRegisterUser.mockRejectedValueOnce(new Error("サーバーエラーです"));

    render(<UserRegistration />);

    fireEvent.input(screen.getByLabelText("ユーザー名"), {
      target: { value: "tanitune" },
    });
    fireEvent.input(screen.getByLabelText("メールアドレス"), {
      target: { value: "tanisan@example.com" },
    });
    fireEvent.input(screen.getByLabelText("パスワード入力"), {
      target: { value: "password" },
    });
    fireEvent.input(screen.getByLabelText("パスワード確認"), {
      target: { value: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "ユーザー登録" }));

    await waitFor(() => {
      expect(screen.getByText("サーバーエラーです")).toBeInTheDocument();
    });
  });
});
