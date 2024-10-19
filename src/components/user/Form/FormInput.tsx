import styles from "./FormInput.module.css";
import { FormInputProps } from "@/types/user";

const FormInput:React.FC<FormInputProps> = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}) =>  (
    <>
      <div className={styles.formRegister}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register} />
        {error?.message && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    </>
  );

export default FormInput;
