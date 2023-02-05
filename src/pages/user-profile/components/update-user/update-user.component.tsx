/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext, useEffect, useState } from "react";

import "./update-user.styles.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FirebaseContext, useModal } from "../../../../utils";
import {
  UpdateFormType,
  UpdateUserContentProps,
  UpdateUserProps,
} from "./update-user.model";
import { UnitDto } from "../../../../types";
import { AlertWindow } from "../../../../shared";

const UpdateFormContent: React.FC<UpdateUserContentProps> = ({
  userData,
  closeHandler,
  resultHandler,
  units,
}) => {
  const [isLoading, toggleLoading] = useModal(false);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const defaultUnit = units.findIndex(
    (elem) => elem.id === userData.faculty.id
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormType>({
    defaultValues: {
      faculty: defaultUnit,
    },
  });

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleFormSubmit = (data: UpdateFormType) => {
    toggleLoading();

    firebase
      .setUser(userData.uid, {
        ...userData,
        firstName: data.firstName,
        lastName: data.lastName,
        group: data.group,
        faculty: units[data.faculty],
      })
      .then(() => {
        resultHandler();
        closeHandler();
      })
      .catch((e) => {
        setError(e.message);
        toggleLoading();
      });
  };

  return (
    <Dialog open onClose={closeHandler}>
      <DialogTitle>Редактировать информацию</DialogTitle>
      <DialogContent>
        <div className="updateUserFormWrapper">
          <TextField
            color="success"
            id="firstName-basic"
            error={!!errors.firstName}
            label="Имя"
            defaultValue={userData.firstName}
            variant="outlined"
            helperText={
              errors.firstName ? errors.firstName.message : "Ваше имя"
            }
            {...register("firstName", {
              required: { value: true, message: "Поле обязательно" },
              pattern: {
                value: /[a-zA-Zа-яА-Я]$/,
                message: "Не корретный формат",
              },
            })}
          />
          <TextField
            color="success"
            id="lastName-basic"
            error={!!errors.lastName}
            label="Фамилия"
            defaultValue={userData.lastName}
            variant="outlined"
            helperText={
              errors.lastName ? errors.lastName.message : "Ваша фамилия"
            }
            {...register("lastName", {
              required: { value: true, message: "Поле обязательно" },
              pattern: {
                value: /[a-zA-Zа-яА-Я]$/,
                message: "Не корретный формат",
              },
            })}
          />

          <TextField
            color="success"
            id="group-basic"
            error={!!errors.group}
            defaultValue={userData.group}
            label="Group"
            variant="outlined"
            helperText={
              errors.group ? errors.group.message : "Номер вашей группы"
            }
            {...register("group", {
              required: { value: true, message: "Поле обязательно" },
              pattern: {
                value: /[0-9]$/,
                message: "Не корретный формат",
              },
            })}
          />

          <FormControl fullWidth error={!!errors.faculty} color="success">
            <InputLabel id="select-label">Faculty</InputLabel>
            <Select
              id="faculty-select"
              label="Факультет"
              inputProps={{
                defaultValue: units.findIndex(
                  (elem) => elem.id === userData.faculty.id
                ),
              }}
              {...register("faculty", {
                required: { value: true, message: "Поле обязательно" },
              })}
            >
              {units.map((unit, index) => (
                <MenuItem value={index}>{unit.fullName}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.faculty ? errors.faculty.message : "Ваш факультет"}
            </FormHelperText>
          </FormControl>
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

export const UpdateUserModal: React.FC<UpdateUserProps> = ({
  userData,
  closeHandler,
  resultHandler,
}) => {
  const [units, setUnits] = useState<UnitDto[]>([]);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.units().once("value", (snapshot) => {
      setUnits(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <>
      {!!units.length && (
        <UpdateFormContent
          userData={userData}
          closeHandler={closeHandler}
          resultHandler={resultHandler}
          units={units}
        />
      )}
    </>
  );
};
