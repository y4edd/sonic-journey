import type { registerSchema, loginSchema } from "@/lib/validation";
import type { FieldError, UseFormRegister } from "react-hook-form";
import type { z } from "zod";

export type registerFormData = z.infer<typeof registerSchema>;

export type loginFormData = z.infer<typeof loginSchema>;

export type FormData = {
  name?:string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export type FormInputProps = {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FormData>;
  error?: FieldError;
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
