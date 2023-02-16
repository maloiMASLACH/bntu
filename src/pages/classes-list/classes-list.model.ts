import { ClassDto } from "../../types";

export interface ClassesRequestResponse {
  [key: string]: {
    classData: ClassDto;
    users: { [key: string]: string };
  };
}

export interface ClassesFilterType {
  name: string;
  master: string;
}
