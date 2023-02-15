import { ClassDto } from "../../../../types";

export interface ClassesResponseType {
  [key: string]: ClassDataType;
}

interface ClassDataType {
  classData: ClassDto;
}
