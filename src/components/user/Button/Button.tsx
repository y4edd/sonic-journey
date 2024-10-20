import React from "react";
import { ButtonProps } from "@mui/material";

const Button:React.FC<ButtonProps> = ({
  type,
  value,
  className
}) => {
  return(
    <>
      <input
        type={type}
        value={value}
        className={className}
      />
    </>
  )

}

export default Button;
