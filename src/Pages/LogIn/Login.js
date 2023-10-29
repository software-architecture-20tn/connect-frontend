import React from "react";
import * as yup from "yup";

function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.required().min(8).matches(/^[a-zA-Z0-9_.-]*$/),
  });
  return <div>Login</div>;
}

export default Login;
