import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyTextField from "../../Components/MyTextField/MyTextField";
import "./Login.scss";
import MyButton from "../../Components/MyButton/MyButton";
// import { fetchApi } from "../../api/auth";
import { useDispatch } from "react-redux";
import { logIn } from "../../_helpers/authThunk";

function Login() {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8)
      .matches(/^[a-zA-Z0-9_.-]*$/),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const dataRequest = {
      email: data.email,
      password: data.password,
    };
    dispatch(logIn(dataRequest));
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="login__form__title">Login</label>
        <label className="login__form__greeting">Welcome back</label>
        <MyTextField
          className="login__form__input"
          control={control}
          name="email"
          label="Email"
          errorMsg={errors.email?.message}
          textWidth="70%"
        />
        <MyTextField
          className="login__form__input"
          control={control}
          name={"password"}
          label="Password"
          errorMsg={errors.password?.message}
          type="password"
          textWidth="70%"
        />
        <MyButton text="Log in" type="submit" />
      </form>
    </div>
  );
}

export default Login;
