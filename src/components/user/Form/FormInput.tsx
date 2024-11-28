import type { FormInputProps } from "@/types/user";
import styles from "./FormInput.module.css";

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  register,
  error,
}) => {
  const registration = register(name);

  return (
    <>
      <div className={styles.formRegister}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...registration}
          className={styles.userInput}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className={styles.errorMessage}>{error?.message && <span>{error.message}</span>}</div>
      </div>
    </>
  );
};

export default FormInput;
