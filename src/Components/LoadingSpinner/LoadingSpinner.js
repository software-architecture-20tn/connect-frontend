import { CircularProgress, Box } from "@mui/material";
import "./LoadingSpinner.scss";

import React from "react";

function LoadingSpinner(className, ...props) {
  return (
    <Box
      sx={{ display: "flex" }}
      className={`${className} loading-spinner`}
      {...props}
    >
      <CircularProgress
        className={`${className} loading-spinner__circular`}
        {...props}
      />
    </Box>
  );
}

export default LoadingSpinner;
