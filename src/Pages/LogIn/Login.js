import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTextField from "../../Components/MyTextField/MyTextField";
import "./Login.scss";
import MyButton from "../../Components/MyButton/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../_helpers/authThunk";
function Login() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const authStates = useSelector((state) => state.auth);
  useEffect(() => {
    if (authStates.isLogin) {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (authStates.error >= 400 && authStates.error < 500) {
      toast.error("Please recheck password and username", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [authStates]);

  const onSubmit = async (data) => {
    const dataRequest = {
      email: data.email,
      password: data.password,
    };
    console.log(dataRequest);
    dispatch(logIn(dataRequest));
  };

  return (
    <div className="login">
      <ToastContainer />
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
        <Link className="link_to_signup" to="/register">
          Đăng ký
        </Link>
      </form>
    </div>
  );
}

export default Login;
