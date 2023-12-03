import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./ErrorMsg.scss";

function ErrorMsg({ errorMsg, className, ...props }) {
  return (
    <p className={`error ${className}`}>
      <ErrorOutlineIcon className="error__icon" />
      <span className="error__message">{errorMsg}</span>
    </p>
  );
}

export default ErrorMsg;
