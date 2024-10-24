import type { ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps & { text: string }> = ({ type, className, onClick, text }) => {
  return (
    <>
      <div>
        <button type={type} className={className} onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
};

export default Button;
