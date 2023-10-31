import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyTextField from "../../Components/MyTextField/MyTextField";
import "./Signup.scss";
import MyButton from "../../Components/MyButton/MyButton";

function Signup() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    userName: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8)
      .matches(/^[a-zA-Z0-9_.-]*$/),
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
    console.log(data);
    const dataRequest = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_retype: data.passwordConfirm,
      username: data.userName,
    };
    try {
      const response = await fetch(
        "https://chat-app.nguyenvanloc.name.vn/api/users/xxxxxx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataRequest),
        },
      );
      if (!response.ok) {
        const errorText = await response.text(); // Lấy nội dung lỗi từ response
        console.log(errorText);
        throw new Error("Lỗi trong quá trình xử lý yêu cầu.");
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="signup__form__title">Register</label>
        <label className="signup__form__greeting">Welcome back</label>
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
      </form>
    </div>
  );
}

export default Signup;
