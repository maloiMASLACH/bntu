import React from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import "./units.styles.css";
import { useNavigate } from "react-router-dom";
import { UnitsListProps } from "./units.model";
import { RouterLinks } from "../../../../constants";

export const UnitsList: React.FC<UnitsListProps> = ({ units }) => {
  const navigate = useNavigate();

  const handleGoToUnit = (id: GridRowId) => {
    navigate(`../${RouterLinks.Unit}/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Кратко", flex: 100 },
    { field: "fullName", headerName: "Полное название", flex: 100 },
  ];

  return (
    <div className="adminTable">
      <h3>Список факультетов</h3>
      <DataGrid
        onRowClick={(rowData) => handleGoToUnit(rowData.id)}
        rows={units}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
};
