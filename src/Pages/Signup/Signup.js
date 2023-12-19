import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchApi } from "../../api";
import MyTextField from "../../Components/MyTextField/MyTextField";
import "./Signup.scss";
import MyButton from "../../Components/MyButton/MyButton";

function Signup() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    userName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        "Username should not contain space and special characters",
      )
      .required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters")
      .matches(/^\S+$/, "Password should not contain space"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const dataRequest = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_retype: data.passwordConfirm,
      username: data.userName,
    };

    const signUp = () => fetchApi.post("/users/register/", dataRequest);

    const response = await signUp(dataRequest);
    const dataResponse = await response.json();
    if (dataResponse.ok) {
      toast.success("Register successful!", {
        position: "top-right",
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const entries = Object.entries(dataResponse);
      for (const [key, value] of entries) {
        if (key === "status") continue;
        toast.error(`${key}: ${value}`, {
          position: "top-right",
          autoClose: 1000,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <div className="signup">
      <ToastContainer />
      <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="signup__form__title">Register</label>
        <label className="signup__form__greeting">Welcome</label>
        <div className="signup__rows">
          <MyTextField
            className="signup__form__input"
            control={control}
            name="firstName"
            label="First name"
            errorMsg={errors.firstName?.message}
            textWidth="49%"
          />
          <MyTextField
            className="signup__form__input"
            control={control}
            name="lastName"
            label="Last name"
            errorMsg={errors.lastName?.message}
            textWidth="49%"
          />
        </div>
        <MyTextField
          className="signup__form__input"
          control={control}
          name="userName"
          label="Username"
          errorMsg={errors.userName?.message}
          textWidth="70%"
        />
        <MyTextField
          className="signup__form__input"
          control={control}
          name="email"
          label="Email"
          errorMsg={errors.email?.message}
          textWidth="70%"
        />
        <MyTextField
          className="signup__form__input"
          control={control}
          name={"password"}
          label="Password"
          errorMsg={errors.password?.message}
          type="password"
          textWidth="70%"
        />
        <MyTextField
          className="signup__form__input"
          control={control}
          name={"passwordConfirm"}
          label="Confirm Password"
          errorMsg={errors.passwordConfirm?.message}
          type="password"
          textWidth="70%"
        />
        <MyButton text="Register" type="submit" />
        <Link className="link_to_signin" to="/login">
          Đăng nhập
        </Link>
      </form>
    </div>
  );
}

export default Signup;
