import { UnitDto, UserDto } from "../../../../types";

export interface UpdateUserProps {
  closeHandler: () => void;
  resultHandler: () => void;
  userData: UserDto;
}

export interface UpdateUserContentProps {
  closeHandler: () => void;
  resultHandler: () => void;
  userData: UserDto;
  units: UnitDto[];
}

export interface UpdateFormType {
  firstName: string;
  lastName: string;
  group: string;
  faculty: number;
  number?: string;
}
