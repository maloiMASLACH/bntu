import { UnitDto } from "../../../../types";

export interface UpdateUnitFormProps {
  unitData: UnitDto;
  handleClose: () => void;
  handleChange: () => void;
}

export interface UpdateUnitType {
  fullName: string;
  description: string;
  logo: string;
  mainImg: FileList;
  name: string;
}
