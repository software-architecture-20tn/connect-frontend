import { React, useState } from "react";
import "./PasswordForgot.scss";
import * as yup from "yup";
import MyTextField from "../../Components/MyTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../Components/MyButton/MyButton";
import { useDispatch } from "react-redux";
import { resetPassword } from "./helper";

function PasswordForgot() {
  // eslint-disable-next-line
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const dataRequest = {
      email: data.email,
    };
    dispatch(resetPassword(dataRequest));
    setShowSuccessMessage(true);
  };

  return (
    <div className="password-forgot">
      <form className="password-forgot__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="password-forgot__form__title">Forgot Password</label>
        <label className="password-forgot__form__greeting">
          Enter your email to reset your password
        </label>
        <MyTextField
          className="password-forgot__form__input"
          name="email"
          label="Email"
          textWidth="70%"
          control={control}
          errorMsg={errors.email?.message}
        />

        <MyButton text="Reset password" type="submit" />

        {showSuccessMessage && (
          <div className="password-forgot__form__success-message">
            <p>A reset password email has been sent.</p>
            <p>
              Please check your email (include spam folder) for further steps.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default PasswordForgot;
