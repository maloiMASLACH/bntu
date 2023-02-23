import {
  ClassDto, PlaceDto, UnitDto, UserDto
} from "../../../../types";

export interface ClassesListProps {
  classes: ClassDto[];
  units: UnitDto[];
  users: UserDto[];
  places: PlaceDto[];
  handleChange: () => void;
}

export interface NavigateModalProps {
  classData: ClassDto;
  units: UnitDto[];
  users: UserDto[];
  places: PlaceDto[];
  handleChange: () => void;
}

export interface MasterDataProps {
  userId: string;
}
