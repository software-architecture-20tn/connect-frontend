import React from "react";
import "./MyButton.scss";
import { Button } from "@mui/material";
function MyButton({ className, text, type, variant = "contained", ...props }) {
  return (
    <div>
      <Button
        className={`${className} custom-button`}
        variant={variant}
        type={type}
        {...props}
      >
        {text}
      </Button>
    </div>
  );
}

export default MyButton;
