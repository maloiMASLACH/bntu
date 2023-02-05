/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from "react";

import "./update-password.styles.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FirebaseContext, useModal } from "../../../../utils";
import { UpdateFormType, UpdatePasswordProps } from "./update-password.model";
import { AlertWindow } from "../../../../shared";

export const UpdatePasswordModal: React.FC<UpdatePasswordProps> = ({
  closeHandler,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSecured, toggleSecured] = useModal(true);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormType>({});

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleFormSubmit = (data: UpdateFormType) => {
    if (data.password !== data.repeatPassword) {
      setError("Пароли должны совпадать");
    } else {
      toggleLoading();

      firebase
        .doPasswordUpdate(data.password)
        .then(() => {
          closeHandler();
        })
        .catch((e) => {
          toggleLoading();
          setError(e.message);
        });
    }
  };

  return (
    <Dialog open onClose={closeHandler}>
      <DialogTitle>Задать новый пароль</DialogTitle>
      <DialogContent>
        <div className="updatePasswordFormWrapper">
          <TextField
            color="success"
            type={isSecured ? "password" : "text"}
            id="password-basic"
            error={!!errors.password}
            helperText={
              errors.password ? errors.password.message : "Ваш новый пароль"
            }
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

          <TextField
            color="success"
            type={isSecured ? "password" : "text"}
            id="repeatPassword-basic"
            error={!!errors.repeatPassword}
            helperText={
              errors.repeatPassword
                ? errors.repeatPassword.message
                : "Повторите пароль"
            }
            label="Repeat password"
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
            {...register("repeatPassword", {
              required: { value: true, message: "Поле обязательно" },
              pattern: {
                value: /^[a-zA-Z0-9]{8,16}$/,
                message:
                  "Пароль должен содержать от 8 до 16 символов (латиница или цифры)",
              },
            })}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeHandler} color="error">
          Закрыть
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          color="success"
          disabled={isLoading}
        >
          Обновить
        </Button>
      </DialogActions>

      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}
    </Dialog>
  );
};
