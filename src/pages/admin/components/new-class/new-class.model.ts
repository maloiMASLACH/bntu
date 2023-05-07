import { PlaceDto, UnitDto, UserDto } from "../../../../types";

export interface CreateNewClassProps {
  units: UnitDto[];
  users: UserDto[];
  places: PlaceDto[];
  handleChange: () => void;
}

export interface CreateNewClassFormProps {
  handleClose: () => void;
  handleChange: () => void;
  places: PlaceDto[];
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
  dateString: string;
  img: FileList;
}
