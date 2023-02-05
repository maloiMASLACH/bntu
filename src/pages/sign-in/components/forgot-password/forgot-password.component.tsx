/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useState } from "react";

import "./forgot-password.styles.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FirebaseContext, useModal } from "../../../../utils";
import { ForgotPasswordProps, ForgotFormType } from "./forgot-password.model";
import { AlertWindow } from "../../../../shared";

export const ForgotPasswordModal: React.FC<ForgotPasswordProps> = ({
  closeHandler,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSuccess, toggleSuccess] = useModal(false);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormType>({});

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleCloseSuccess = () => {
    closeHandler();
  };

  const handleFormSubmit = (data: ForgotFormType) => {
    toggleLoading();

    firebase
      .doPasswordReset(data.email)
      .then(() => {
        toggleSuccess();
      })
      .catch((e) => setError(e.message));
  };

  return (
    <Dialog open onClose={closeHandler}>
      <DialogTitle>Востановить пароль?</DialogTitle>
      <DialogContent>
        <div className="updatePasswordFormWrapper">
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

      {isSuccess && (
        <AlertWindow
          toggleClose={handleCloseSuccess}
          message="Вам отпраленно сообщение на вашу почту"
        />
      )}
    </Dialog>
  );
};
