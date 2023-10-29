import { useForm, Controller } from "react-hook-form";
import { TextField, FormControl } from "@mui/material";

import React from "react";

function MyTextField({
  className,
  name,
  control,
  errorMsg,
  initialValue = "",
  variant = "outlined",
  ...prop
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormControl>
          <TextField
            {...field}
            className={`${className} textfield`}
            variant={variant}
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
        </FormControl>
      )}
    />
  );
}

export default MyTextField;
