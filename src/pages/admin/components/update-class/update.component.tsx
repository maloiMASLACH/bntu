import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AlertWindow } from "../../../../shared";
import { FirebaseContext, useModal } from "../../../../utils";
import { UpdateFormType, UpdateClassFormProps } from "./update.model";
import "./update.styles.css";

export const UpdateClassForm: React.FC<UpdateClassFormProps> = ({
  handleClose,
  handleChange,
  users,
  units,
  places,
  classData,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSuccess, toggleSuccess] = useModal(false);
  const [addedUnits, setAddedUnits] = useState<string[]>(
    Object.values(classData.units)
  );

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const accessibleUsers = users.filter((user) => user.isAdmin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormType>({});

  const handleClearErrorMessage = () => {
    setError("");
  };

  const handleAddUnits = (event: SelectChangeEvent<typeof addedUnits>) => {
    const {
      target: { value },
    } = event;
    setAddedUnits(typeof value === "string" ? value.split(",") : value);
  };

  const handleFormSubmit = (data: UpdateFormType) => {
    toggleLoading();

    const dateFormatted = new Date(data.date).toLocaleString();

    firebase
      .createClass(classData.id, {
        ...data,
        id: classData.id,
        date: dateFormatted,
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
      <DialogTitle>Редактировать занятие</DialogTitle>
      <DialogContent>
        <div className="updateClassFormWrapper">
          <TextField
            color="success"
            id="name-basic"
            error={!!errors.name}
            label="Название"
            defaultValue={classData.name}
            variant="outlined"
            helperText={errors.name ? errors.name.message : "Название кружка"}
            {...register("name", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />
          <TextField
            color="success"
            id="description-basic"
            error={!!errors.description}
            label="Описание"
            defaultValue={classData.description}
            multiline
            minRows={3}
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
            error={!!errors.img}
            label="Изображение"
            defaultValue={classData.img}
            variant="outlined"
            helperText={
              errors.img ? errors.img.message : "Ссылка на изображение"
            }
            {...register("img", {
              required: { value: true, message: "Поле обязательно" },
            })}
          />

          <FormControl fullWidth error={!!errors.masterId} color="success">
            <InputLabel id="select-masterId">Преподователь</InputLabel>
            <Select
              id="master-select"
              label="Преподователь"
              defaultValue={classData.masterId}
              {...register("masterId", {
                required: { value: true, message: "Поле обязательно" },
              })}
            >
              {accessibleUsers.map((user) => (
                <MenuItem value={user.uid}>
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.masterId
                ? errors.masterId.message
                : "Преподователь занятия"}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth color="success" error={!!errors.units}>
            <InputLabel id="select-masterId">Факультеты</InputLabel>
            <Select
              id="units-select"
              label="Факультеты"
              value={addedUnits}
              multiple
              renderValue={(selected: string[]) => selected.join(", ")}
              {...register("units", {
                required: { value: true, message: "Поле обязательно" },
              })}
              onChange={(e) => {
                register("units").onChange(e);
                handleAddUnits(e);
              }}
            >
              {units.map((unit) => (
                <MenuItem value={unit.id}>
                  <Checkbox checked={addedUnits.includes(unit.id)} />
                  <ListItemText primary={unit.name} />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.units ? errors.units.message : "Факультеты соучередители"}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.masterId} color="success">
            <InputLabel id="select-masterId">Место</InputLabel>
            <Select
              id="place-select"
              label="Место"
              defaultValue={classData.place}
              {...register("place", {
                required: { value: true, message: "Поле обязательно" },
              })}
            >
              {places.map(({ auditory, building }) => (
                <MenuItem value={`к.${building}, ауд.${auditory}`}>
                  {`к.${building}, ауд.${auditory}`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.place ? errors.place.message : "Место проевдения"}
            </FormHelperText>
          </FormControl>

          <TextField
            color="success"
            id="date-basic"
            type="datetime-local"
            error={!!errors.date}
            variant="outlined"
            helperText={errors.date ? errors.date.message : "Дата проведения"}
            {...register("date", {
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
          message="Вы успешно обновили занятие"
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
