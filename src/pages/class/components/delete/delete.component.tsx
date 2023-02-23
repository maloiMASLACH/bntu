import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Dialog, DialogActions, DialogTitle
} from "@mui/material";
import { FirebaseContext, useModal } from "../../../../utils";
import "./delete.styles.css";
import { ClassDeleteProps } from "./delete.model";
import { AuthUserContext } from "../../../../context";
import { AlertWindow } from "../../../../shared";

import { RouterLinks } from "../../../../constants";

export const ClassDeleteBlock: React.FC<ClassDeleteProps> = ({ classId }) => {
  const firebase = useContext(FirebaseContext);
  const activeUser = useContext(AuthUserContext);

  const navigate = useNavigate();

  const [errorMessage, setError] = useState("");

  const [isOpen, toggleOpen] = useModal(false);
  const [isLoading, toggleLoading] = useModal(false);

  const handleDelete = () => {
    if (activeUser) {
      toggleLoading();
      firebase
        .deleteClass(classId)
        .then(() => {
          toggleLoading();
          toggleOpen();
          navigate(-1);
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
      <Button variant="contained" color="error" onClick={toggleOpen}>
        Удалить
      </Button>

      <Dialog open={isOpen} onClose={toggleOpen}>
        <div className="classDeleteDialogWrapper">
          <DialogTitle>Удалить этот куржок?</DialogTitle>

          <DialogActions>
            <Button onClick={toggleOpen} color="error">
              Закрыть
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="success"
              disabled={isLoading}
            >
              Удалить
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
