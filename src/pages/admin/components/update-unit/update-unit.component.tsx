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
import { UpdateUnitFormProps, UpdateUnitType } from "./update-unit.model";
import "./update-unit.styles.css";

export const UpdateUnitForm: React.FC<UpdateUnitFormProps> = ({
  handleClose,
  handleChange,
  unitData,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSuccess, toggleSuccess] = useModal(false);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateUnitType>({});

  const fileValue = watch("mainImg");

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleFormSubmit = async (data: UpdateUnitType) => {
    toggleLoading();

    const url = data.mainImg.length
      ? await firebase.uploadFile("unit", data.mainImg[0], unitData.id)
      : unitData.mainImg;

    firebase
      .updateUnit(unitData.id, {
        ...data,
        mainImg: `${url}`,
        id: unitData.id,
      })
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
      <DialogTitle>Редактировать факультут</DialogTitle>
      <DialogContent className="updateUnitDialogWrapper">
        <div className="updateUnitFormWrapper">
          <TextField
            color="success"
            id="name-basic"
            error={!!errors.name}
            label="Название"
            defaultValue={unitData.name}
            variant="outlined"
            helperText={
              errors.name ? errors.name.message : "Краткое название факультета"
            }
            {...register("name", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />
          <TextField
            color="success"
            id="name-basic"
            error={!!errors.name}
            label="Название"
            defaultValue={unitData.fullName}
            variant="outlined"
            helperText={
              errors.name ? errors.name.message : "Полное название факультета"
            }
            {...register("fullName", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />
          <TextField
            color="success"
            id="description-basic"
            error={!!errors.description}
            label="Описание"
            defaultValue={unitData.description}
            multiline
            minRows={5}
            variant="outlined"
            helperText={
              errors.description
                ? errors.description.message
                : "Дополнительное описание"
            }
            {...register("description", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />

          <TextField
            color="success"
            id="img-basic"
            error={!!errors.mainImg}
            variant="outlined"
            type="file"
            helperText={
              errors.mainImg ? errors.mainImg.message : "Ссылка на изображение"
            }
            {...register("mainImg", {
              required: { value: false, message: "Поле обязательно" },
            })}
          />
          {fileValue && fileValue[0] ? (
            <p className="fileName">{fileValue[0].name}</p>
          ) : (
            <p className="fileName">{unitData.mainImg}</p>
          )}

          <TextField
            color="success"
            id="description-basic"
            error={!!errors.description}
            label="Иконка"
            defaultValue={unitData.logo}
            variant="outlined"
            helperText={
              errors.logo
                ? errors.logo.message
                : "Иконка факультета"
            }
            {...register("logo", {
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
          Создать
        </Button>
      </DialogActions>

      {isSuccess && (
        <AlertWindow
          toggleClose={handleClose}
          message="Вы успешно обновили факультет"
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
