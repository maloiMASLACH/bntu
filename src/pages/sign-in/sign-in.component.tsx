import React, { useContext, useState } from "react";
import {
  TextField, Button, InputAdornment, IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

import "./sign-in.styles.css";
import { useNavigate } from "react-router-dom";
import { SignInType } from "./sign-in.model";
import { FirebaseContext, useModal } from "../../utils";
import { RouterLinks } from "../../constants";
import { AlertWindow } from "../../shared";
import { ForgotPasswordModal } from "./components";

export const SignInPage: React.FC = () => {
  const [isSecured, toggleSecured] = useModal(true);
  const [isLoading, toggleLoading] = useModal(false);
  const [isForgot, toggleForgot] = useModal(false);
  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>();

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleFormSubmit = (data: SignInType) => {
    toggleLoading();
    firebase
      .doSignInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        navigate(RouterLinks.Landing);
      })
      .catch((e) => {
        setError(e.message);
        toggleLoading();
      });
  };

  const handleGoRegister = () => {
    navigate(`../${RouterLinks.SingUp}`);
  };

  return (
    <form className="signInWrapper">
      <p className="signInDescription">Войдте в уже сущесвующий аккаунт</p>
      <TextField
        color="success"
        id="outlined-basic"
        error={!!errors.email}
        label="Email"
        variant="outlined"
        helperText={errors.email ? errors.email.message : "Ваша почта"}
        {...register("email", {
          required: { value: true, message: "Поле обязательно" },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Не корретный формат",
          },
        })}
      />
      <div className="forgotPassword">
        <TextField
          color="success"
          type={isSecured ? "password" : "text"}
          id="outlined-basic"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : "Ваш пароль"}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleSecured}
                  onMouseDown={toggleSecured}
                  edge="end"
                >
                  {isSecured ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          {...register("password", {
            required: { value: true, message: "Поле обязательно" },
            pattern: {
              value: /^[a-zA-Z0-9]{8,16}$/,
              message:
                "Пароль должен содержать от 8 до 16 символов (латиница или цифры)",
            },
          })}
        />
        <Button
          color="success"
          variant="text"
          type="button"
          disabled={isLoading}
          onClick={toggleForgot}
        >
          Забыли пароль?
        </Button>
      </div>

      <Button
        color="success"
        variant="contained"
        type="button"
        disabled={isLoading}
        onClick={handleSubmit(handleFormSubmit)}
      >
        Войти
      </Button>

      <p className="signInDescription">или</p>

      <Button
        color="success"
        variant="contained"
        type="button"
        disabled={isLoading}
        onClick={handleGoRegister}
      >
        Зарегестрируйтесь
      </Button>

      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}

      {isForgot && <ForgotPasswordModal closeHandler={toggleForgot} />}
    </form>
  );
};
