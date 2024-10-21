import type { FormInputProps } from "@/types/user";
import styles from "./FormInput.module.css";

const FormInput: React.FC<FormInputProps> = ({ label, id, type, name, placeholder, register, error }) => {
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
        />
        {error?.message && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    </>
  );
}

export default FormInput;
