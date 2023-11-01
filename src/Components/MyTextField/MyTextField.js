import { Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";
import "./MyTextField.scss";
import React from "react";

function MyTextField({
  className,
  name,
  control,
  label,
  textWidth = "100%",
  errorMsg = null,
  initialValue = "",
  variant = "standard",

  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormControl style={{ width: textWidth }}>
          <TextField
            {...field}
            className={`${className} text-field`}
            variant={variant}
            label={label}
            error={errorMsg !== null}
            fullWidth
            {...props}
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
        </FormControl>
      )}
    />
  );
}

export default MyTextField;
