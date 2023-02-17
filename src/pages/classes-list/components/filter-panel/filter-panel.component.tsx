import React from "react";

import "./filter-panel.styles.css";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FilterPanelProps } from "./filter-panel.model";
import { ClassesFilterType } from "../../classes-list.model";

export const ClassesFilterPanel: React.FC<FilterPanelProps> = ({
  handleChange,
  masters,
}) => {
  const handleFormSubmit = (data: ClassesFilterType) => {
    handleChange({ ...data });
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ClassesFilterType>({});

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
      {masters && (
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
      )}
    </form>
  );
};
