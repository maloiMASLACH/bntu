import { UnitDto } from "./unit.type";

export interface UserDto {
  uid: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  faculty: UnitDto;
}
