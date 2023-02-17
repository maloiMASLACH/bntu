import { UserDto } from "../../../../types";

export interface UsersListProps {
  users: string[];
}

export interface UsersResponseType {
  [key: string]: UserDataType;
}

export interface UserDataType {
  userData: UserDto;
}
