import { UnitDto } from "../../../../types";

export interface UnitsListProps {
  units: UnitDto[];
  handleChange: () => void;
}
