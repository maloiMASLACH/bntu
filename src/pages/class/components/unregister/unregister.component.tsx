import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Dialog, DialogActions, DialogTitle
} from "@mui/material";
import { FirebaseContext, useModal } from "../../../../utils";
import "./unregister.styles.css";
import { ClassUnRegisterProps } from "./unregister.model";
import { AuthUserContext } from "../../../../context";
import { AlertWindow } from "../../../../shared";

import { RouterLinks } from "../../../../constants";

export const ClassUnRegisterBlock: React.FC<ClassUnRegisterProps> = ({
  toggleSuccess,
  classId,
}) => {
  const firebase = useContext(FirebaseContext);
  const activeUser = useContext(AuthUserContext);

  const navigate = useNavigate();

  const [errorMessage, setError] = useState("");

  const [isOpen, toggleOpen] = useModal(false);
  const [isLoading, toggleLoading] = useModal(false);

  const handleRegister = () => {
    if (activeUser) {
      toggleLoading();
      firebase
        .unregisterToClass(classId, activeUser.userId)
        .then(() => {
          toggleLoading();
          toggleOpen();
          toggleSuccess();
        })
        .catch((e: Error) => {
          setError(e.message);
          toggleLoading();
        });
    } else {
      navigate(`../${RouterLinks.SingIn}`);
    }
  };

  const handleClearErrorMessage = () => {
    setError("");
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={toggleOpen}>
        Отменить запись
      </Button>

      <Dialog open={isOpen} onClose={toggleOpen}>
        <div className="classUnregisterDialogWrapper">
          <DialogTitle>Отменить запись?</DialogTitle>

          <DialogActions>
            <Button onClick={toggleOpen} color="error">
              Закрыть
            </Button>
            <Button
              onClick={handleRegister}
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              Отменить запись
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}
    </>
  );
};
