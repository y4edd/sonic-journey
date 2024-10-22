import type { ButtonProps } from "@mui/material";

const Button: React.FC<ButtonProps & { text: string }> = ({ type, className, text }) => {
  return (
    <>
      <div>
        <button type={type} className={className}>
          {text}
        </button>
      </div>
    </>
  );
};

export default Button;
