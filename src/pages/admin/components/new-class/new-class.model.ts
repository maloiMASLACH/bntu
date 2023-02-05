import { UnitDto, UserDto } from "../../../../types";

export interface CreateNewClassProps {
  units: UnitDto[];
  users: UserDto[];
}

export interface CreateNewClassFormProps {
  handleClose: () => void;
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
