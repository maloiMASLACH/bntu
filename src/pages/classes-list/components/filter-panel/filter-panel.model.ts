import { ClassesFilterType } from "../../classes-list.model";

export interface FilterPanelProps {
  handleChange: React.Dispatch<React.SetStateAction<ClassesFilterType | undefined>>;
}
