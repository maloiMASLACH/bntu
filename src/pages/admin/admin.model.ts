import { ClassDto, UnitDto, UserDto } from "../../types";

export interface AdminPageProps {
  isAdmin: boolean;
}

export interface UsersResponseType {
  [key: string]: UserDataType;
}

interface UserDataType {
  userData: UserDto;
}

export interface UnitsResponseType {
  [key: string]: UnitDto;
}

export interface ClassesResponseType {
  [key: string]: ClassDataType;
}

interface ClassDataType {
  classData: ClassDto;
}
