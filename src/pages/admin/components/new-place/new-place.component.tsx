import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertWindow } from "../../../../shared";
import { FirebaseContext, useModal } from "../../../../utils";
import {
  CreateFormType,
  CreateNewPlaceFormProps,
  CreateNewPlaceProps,
} from "./new-place.model";
import "./new-place.styles.css";

const CreateNewPlaceForm: React.FC<CreateNewPlaceFormProps> = ({
  handleClose,
  handleChange,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSuccess, toggleSuccess] = useModal(false);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormType>({});

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleFormSubmit = (data: CreateFormType) => {
    toggleLoading();

    firebase
      .createPlace(data.building, data.auditory)
      .then(() => {
        toggleSuccess();
        handleChange();
      })
      .catch((e) => {
        setError(e.message);
        toggleLoading();
      });
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>Зарегестрировать аудиторию</DialogTitle>
      <DialogContent>
        <div className="createPlaceFormWrapper">
          <TextField
            color="success"
            id="building-basic"
            error={!!errors.building}
            label="Корпус"
            variant="outlined"
            helperText={
              errors.building ? errors.building.message : "Номер корпуса"
            }
            {...register("building", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />
          <TextField
            color="success"
            id="description-basic"
            error={!!errors.auditory}
            label="Описание"
            multiline
            minRows={3}
            variant="outlined"
            helperText={
              errors.auditory ? errors.auditory.message : "Номер аудитории"
            }
            {...register("auditory", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          Закрыть
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          color="success"
          disabled={isLoading}
        >
          Зарегестировать
        </Button>
      </DialogActions>

      {isSuccess && (
        <AlertWindow
          toggleClose={handleClose}
          message="Аудитория зарегестрированна"
        />
      )}
      {!!errorMessage.length && (
        <AlertWindow
          toggleClose={handleClearErrorMessage}
          message={errorMessage}
        />
      )}
    </Dialog>
  );
};

export const CreateNewPlace: React.FC<CreateNewPlaceProps> = ({
  handleChange,
}) => {
  const [isCreating, toggleCreating] = useModal(false);

  return (
    <div className="adminButtons">
      <Button
        color="success"
        variant="contained"
        type="button"
        fullWidth
        onClick={toggleCreating}
      >
        Зарегестировать аудиторию
      </Button>

      {isCreating && (
        <CreateNewPlaceForm
          handleClose={toggleCreating}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};
