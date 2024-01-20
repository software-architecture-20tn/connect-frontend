import React, { useEffect, useState } from "react";
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
import LoadingSpinner from "../../Components/LoadingSpinner";
function Login() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().required("Please enter your email or username"),
    password: yup.string().required("Please enter your password"),
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
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0); // Add this line
  const [hasShownToast, setHasShownToast] = useState(false);
  useEffect(() => {
    if (authStates.isLogin && !hasShownToast) {
      setHasShownToast(true);
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
    } else if (
      authStates.error >= 400 &&
      authStates.error < 500 &&
      !hasShownToast
    ) {
      setHasShownToast(true);
      toast.error("Please recheck password and username", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [authStates, requestCount]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setHasShownToast(false);
    const dataRequest = {
      password: data.password,
    };
    const isEmail = /\S+@\S+.\S+/.test(data.email);
    if (isEmail) {
      dataRequest.email = data.email;
    } else {
      dataRequest.id = data.email;
    }

    console.log(dataRequest);
    try {
      await dispatch(logIn(dataRequest));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setRequestCount(requestCount + 1);
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      {isLoading && <LoadingSpinner className="loading" />}
      <form
        className={`login__form ${isLoading ? "blur" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <Link className="link-to-forgot-password" to="/forgot-password">
          Forgot password
        </Link>
      </form>
    </div>
  );
}

export default Login;
