import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { FirebaseContext, useModal } from "../../../../utils";
import "./register.styles.css";
import { ClassRegisterProps } from "./register.model";
import { AuthUserContext } from "../../../../context";
import { AlertWindow } from "../../../../shared";

import { RouterLinks } from "../../../../constants";

export const ClassRegisterBlock: React.FC<ClassRegisterProps> = ({
  toggleSuccess,
  classId,
}) => {
  const firebase = useContext(FirebaseContext);
  const activeUser = useContext(AuthUserContext);

  const navigate = useNavigate();

  const [errorMessage, setError] = useState("");

  const [isOpen, toggleOpen] = useModal(false);
  const [isLoading, toggleLoading] = useModal(false);

  const handleOpen = () => {
    if (activeUser?.userId.length) {
      toggleOpen();
    } else {
      navigate(`../${RouterLinks.SingIn}`);
    }
  };

  const handleRegister = () => {
    if (activeUser?.userId.length) {
      toggleLoading();
      firebase
        .registerToClass(classId, activeUser.userId)
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
      <Button variant="contained" color="success" onClick={handleOpen}>
        Записаться
      </Button>

      <Dialog open={isOpen} onClose={toggleOpen}>
        <div className="classRegisterDialogWrapper">
          <DialogTitle>Записаться на этот куржок?</DialogTitle>

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
              Записаться
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
