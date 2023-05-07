import {
  ClassDto, PlaceDto, UnitDto, UserDto
} from "../../../../types";

export interface UpdateClassFormProps {
  classData: ClassDto;
  handleClose: () => void;
  handleChange: () => void;
  places: PlaceDto[];
  units: UnitDto[];
  users: UserDto[];
}

export interface UpdateFormType {
  name: string;
  description: string;
  masterId: string;
  units: string[];
  place: string;
  date: string;
  dateString: string;
  img: FileList;
}
