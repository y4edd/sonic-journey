import type { schema } from "@/lib/validation";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { z } from "zod";

export type FormData = z.infer<typeof schema>;

export type FormInputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
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
  href: string;
  message: string;
};

export type InformationProps = {
  text: string;
};
