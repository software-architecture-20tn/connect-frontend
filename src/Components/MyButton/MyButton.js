import React from "react";
import "./MyButton.scss";
import { Button } from "@mui/material";
function MyButton({ className, text, type, variant = "contained", ...props }) {
  return (
    <div>
      <Button
        className={`custom-button ${className}`}
        variant={variant}
        type={type}
        color="primary"
        {...props}
      >
        {text}
      </Button>
    </div>
  );
}

export default MyButton;
