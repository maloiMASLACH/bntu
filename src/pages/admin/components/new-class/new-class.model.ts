import { UnitDto, UserDto } from "../../../../types";

export interface CreateNewClassProps {
  units: UnitDto[];
  users: UserDto[];
  handleChange: () => void;
}

export interface CreateNewClassFormProps {
  handleClose: () => void;
  handleChange: () => void;
  units: UnitDto[];
  users: UserDto[];
}

export interface CreateFormType {
  name: string;
  description: string;
  masterId: string;
  units: string[];
  place: string;
  date: string;
  img: string;
}
