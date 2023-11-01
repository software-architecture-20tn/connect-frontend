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
        sx={{
          backgroundColor: "var(--button-color)",
          borderRadius: "50px",
          "&:hover": {
            backgroundColor: "var(--secondary-button-color)",
          },
        }}
        {...props}
      >
        {text}
      </Button>
    </div>
  );
}

export default MyButton;
