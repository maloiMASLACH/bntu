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
import {
  CreateFormType,
  CreateNewClassFormProps,
  CreateNewClassProps,
} from "./new-class.model";
import "./new-class.styles.css";

const CreateNewClassForm: React.FC<CreateNewClassFormProps> = ({
  handleClose,
  handleChange,
  users,
  units,
  places,
}) => {
  const [isLoading, toggleLoading] = useModal(false);
  const [isSuccess, toggleSuccess] = useModal(false);
  const [addedUnits, setAddedUnits] = useState<string[]>([]);

  const [errorMessage, setError] = useState("");

  const firebase = useContext(FirebaseContext);

  const accessibleUsers = users.filter((user) => user.isAdmin);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateFormType>({});

  const handleClearErrorMessage = () => {
    setError("");
  };

  const fileValue = watch("img");

  const handleAddUnits = (event: SelectChangeEvent<typeof addedUnits>) => {
    const {
      target: { value },
    } = event;
    setAddedUnits(typeof value === "string" ? value.split(",") : value);
  };

  const handleFormSubmit = async (data: CreateFormType) => {
    toggleLoading();
    const uniqId = Math.random().toString(16).slice(2);
    const dateFormatted = new Date(data.date).toLocaleString();

    const url = await firebase.uploadFile("class", data.img[0], uniqId);

    firebase
      .createClass(uniqId, {
        ...data,
        img: `${url}`,
        id: uniqId,
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
      <DialogTitle>?????????????? ?????????? ??????????????</DialogTitle>
      <DialogContent className="createClassDialogWrapper">
        <div className="createClassFormWrapper">
          <TextField
            color="success"
            id="name-basic"
            error={!!errors.name}
            label="????????????????"
            variant="outlined"
            helperText={errors.name ? errors.name.message : "???????????????? ????????????"}
            {...register("name", {
              required: { value: true, message: "???????? ??????????????????????" },
            })}
          />
          <TextField
            color="success"
            id="description-basic"
            error={!!errors.description}
            label="????????????????"
            multiline
            minRows={3}
            variant="outlined"
            helperText={
              errors.description
                ? errors.description.message
                : "???????????????????????????? ????????????????"
            }
            {...register("description", {
              required: { value: true, message: "???????? ??????????????????????" },
            })}
          />

          <TextField
            color="success"
            id="img-basic"
            error={!!errors.img}
            label="??????????????????????"
            variant="outlined"
            type="file"
            helperText={
              errors.img ? errors.img.message : "???????????? ???? ??????????????????????"
            }
            {...register("img", {
              required: { value: true, message: "???????? ??????????????????????" },
            })}
          />
          {fileValue && fileValue[0] && (
            <p className="fileName">{fileValue[0].name}</p>
          )}

          <FormControl fullWidth error={!!errors.masterId} color="success">
            <InputLabel id="select-masterId">??????????????????????????</InputLabel>
            <Select
              id="master-select"
              label="??????????????????????????"
              {...register("masterId", {
                required: { value: true, message: "???????? ??????????????????????" },
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
                : "?????????????????????????? ??????????????"}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth color="success" error={!!errors.units}>
            <InputLabel id="select-masterId">????????????????????</InputLabel>
            <Select
              id="units-select"
              label="????????????????????"
              value={addedUnits}
              multiple
              renderValue={(selected: string[]) => selected.join(", ")}
              {...register("units", {
                required: { value: true, message: "???????? ??????????????????????" },
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
              {errors.units ? errors.units.message : "???????????????????? ??????????????????????????"}
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors.masterId} color="success">
            <InputLabel id="select-masterId">??????????</InputLabel>
            <Select
              id="place-select"
              label="??????????"
              {...register("place", {
                required: { value: true, message: "???????? ??????????????????????" },
              })}
            >
              {places.map(({ auditory, building }) => (
                <MenuItem value={`??.${building}, ??????.${auditory}`}>
                  {`??.${building}, ??????.${auditory}`}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.place ? errors.place.message : "?????????? ????????????????????"}
            </FormHelperText>
          </FormControl>

          <TextField
            color="success"
            id="date-basic"
            type="datetime-local"
            error={!!errors.date}
            variant="outlined"
            helperText={errors.date ? errors.date.message : "???????? ????????????????????"}
            {...register("date", {
              required: { value: true, message: "???????? ??????????????????????" },
            })}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          ??????????????
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          color="success"
          disabled={isLoading}
        >
          ??????????????
        </Button>
      </DialogActions>

      {isSuccess && (
        <AlertWindow
          toggleClose={handleClose}
          message="???? ?????????????? ?????????????? ??????????????"
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

export const CreateNewClass: React.FC<CreateNewClassProps> = ({
  units,
  users,
  places,
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
        ?????????????? ?????????? ??????????????
      </Button>

      {isCreating && (
        <CreateNewClassForm
          handleClose={toggleCreating}
          handleChange={handleChange}
          users={users}
          units={units}
          places={places}
        />
      )}
    </div>
  );
};
