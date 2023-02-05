import { UnitDto } from "../../types";

export interface SignUpType {
  email: string;
  password: string;
  repeatPassword: string;
  group: string;
  firstName: string;
  lastName: string;
  faculty: number;
}
