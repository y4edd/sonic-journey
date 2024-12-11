import type { ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps & { text: string }> = ({ type, className, onClick, text }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
