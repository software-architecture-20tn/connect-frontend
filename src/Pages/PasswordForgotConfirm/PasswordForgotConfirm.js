import { React, useState } from "react";
import * as yup from "yup";
import MyTextField from "../../Components/MyTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyButton from "../../Components/MyButton/MyButton";
import { useDispatch } from "react-redux";
import { resetPasswordConfirm } from "./helper";
import { useSearchParams } from "react-router-dom";
import "./PasswordForgotConfirm.scss";

function PasswordForgotConfirm() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const schema = yup.object().shape({
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

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // Reset error message state
    setShowErrorMessage(false);

    const dataRequest = {
      // eslint-disable-next-line
      token: token,
      password: data.password,
    };
    try {
      const response = await dispatch(resetPasswordConfirm(dataRequest));
      if (response.status === 200) {
        // Reset form and show success message
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
      } else {
        // Show error message
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
      }
    } catch (err) {
      // Show error message
      console.log(err);
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="password-forgot-confirm">
      <form
        className="password-forgot-confirm__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="password-forgot-confirm__form__title">
          Confirm Password Reset
        </label>
        <label className="password-forgot-confirm__form__greeting">
          Enter your new password to confirm the password reset
        </label>
        <MyTextField
          className="password-forgot-confirm__form__input"
          name="password"
          label="New Password"
          type="password"
          textWidth="70%"
          control={control}
          errorMsg={errors.password?.message}
        />
        <MyTextField
          className="password-forgot-confirm__form__input"
          name="passwordConfirm"
          label="Confirm New Password"
          type="password"
          textWidth="70%"
          control={control}
          errorMsg={errors.passwordConfirm?.message}
        />

        <MyButton text="Confirm Reset" type="submit" />

        {showSuccessMessage ? (
          <div className="password-forgot-confirm__form__success-message">
            <p>Password reset successfully confirmed.</p>
            <p>You can now log in with your new password.</p>
          </div>
        ) :
         (
          <div className="password-forgot-confirm__form__error-message">
            <p>Something went wrong.</p>
            <p>Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default PasswordForgotConfirm;
