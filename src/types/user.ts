import type { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type UserData = {
  name: string;
  email: string;
  password: string;
};

export type FormInputProps = {
  label: string;
  id: string;
  type: string;
  name: "name" | "email" | "password" | "passwordConfirm";
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

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type choiceDeleteProps = (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;

export type cancelDeleteProps = (event: React.MouseEvent<HTMLButtonElement>) => void;

export type DeleteConfirm = {
  choiceDelete: choiceDeleteProps;
  deleteProcessing: boolean;
  cancelDelete: cancelDeleteProps;
};
