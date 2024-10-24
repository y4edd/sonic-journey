import type { schema } from "@/lib/validation";
import type { FieldError, UseFormRegister } from "react-hook-form";
import type { z } from "zod";

export type FormData = z.infer<typeof schema>;

export type FormInputProps = {
  label: string;
  id: string;
  type: string;
  name: keyof FormData;
  placeholder: string;
  register: UseFormRegister<FormData>;
  error?: FieldError;
};

export type Form = {
  userName: string;
  mailAddress: string;
  password: string;
  passwordConfirm: string;
};

export type ButtonProps = {
  type: string;
  value: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type GuideProps = {
  guideText: string;
  href: string;
  message: string;
};

export type InformationProps = {
  text: string;
};

export type ToastProps = {
  message: string;
  type?: "success" | "error";
};
