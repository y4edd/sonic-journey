import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "ユーザー名は必須です")
      .max(20, "20文字以内で入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
    email: z
      .string()
      .email("正しいメールアドレスを入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
    password: z
      .string()
      .min(6, "パスワードは6文字以上で入力してください")
      .max(20, "パスワードは20文字以内で入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
    passwordConfirm: z
      .string()
      .min(6, "確認用パスワードは6文字以上で入力してください")
      .max(20, "確認用パスワードは20文字以内で入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["passwordConfirm"],
  });

  export const loginSchema = z
  .object({
    email: z
      .string()
      .email("正しいメールアドレスを入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
    password: z
      .string()
      .min(6, "パスワードは6文字以上で入力してください")
      .max(20, "パスワードは20文字以内で入力してください")
      .refine((value) => !/\s/.test(value), "空白は無効です"),
  })
