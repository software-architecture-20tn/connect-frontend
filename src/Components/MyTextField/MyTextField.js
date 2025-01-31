import { Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorMsg from "../ErrorMsg";
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
        <FormControl
          style={{ width: textWidth }}
          className={`${className} form-control`}
        >
          <TextField
            {...field}
            className={`${className} text-field`}
            variant={variant}
            label={label}
            error={errorMsg !== null}
            fullWidth
            onBlur={(e) => {
              if (e.target.value === "") {
                field.onChange({ target: { value: initialValue } });
              }
            }}
            {...props}
          />
          {errorMsg && <ErrorMsg errorMsg={errorMsg} className="error" />}
        </FormControl>
      )}
    />
  );
}

export default MyTextField;
