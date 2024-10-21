import type { ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps & { text: string }> = ({ type, className, text }) => {
  return (
    <>
      <button type={type} className={className}>
        {text}
      </button>
    </>
  );
};

export default Button;
