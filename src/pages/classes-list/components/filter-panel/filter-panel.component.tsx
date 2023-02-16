import React, { useContext, useEffect, useState } from "react";

import "./filter-panel.styles.css";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FirebaseContext } from "../../../../utils";
import { FilterPanelProps } from "./filter-panel.model";
import { ClassesFilterType } from "../../classes-list.model";
import { UserDto } from "../../../../types";
import { UsersResponseType } from "../../../admin/admin.model";

export const ClassesFilterPanel: React.FC<FilterPanelProps> = ({
  handleChange,
}) => {
  const firebase = useContext(FirebaseContext);

  const [masters, setMasters] = useState<UserDto[]>();

  const handleFormSubmit = (data: ClassesFilterType) => {
    handleChange({ ...data });
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ClassesFilterType>({});

  useEffect(() => {
    let isCancelled = false;

    firebase.users().once("value", (snapshot) => {
      const response: UsersResponseType = snapshot.val();

      setMasters(
        Object.values(response || {}).map((elem) => ({
          id: elem.userData.uid,
          facultyName: elem.userData.faculty.name,
          ...elem.userData,
        }))
      );
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isCancelled = true;
    };
  }, []);

  return (
    <form
      className="classListFilterWrapper"
      onChange={handleSubmit(handleFormSubmit)}
    >
      <TextField
        fullWidth
        color="success"
        id="name-basic"
        error={!!errors.name}
        label="Название"
        variant="outlined"
        {...register("name")}
      />

      <FormControl fullWidth error={!!errors.master} color="success">
        <InputLabel id="select-masterId">Преподователь</InputLabel>
        <Select
          id="master-select"
          label="Преподователь"
          defaultValue=""
          {...register("master")}
          onChange={(e) => {
            handleChange({ master: e.target.value, name: getValues("name") });
          }}
        >
          <MenuItem value="">Все</MenuItem>
          {(masters || []).map((master) => (
            <MenuItem value={master.uid}>
              {`${master.firstName} ${master.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};
