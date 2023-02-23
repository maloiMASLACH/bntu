import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./places.styles.css";
import { PlacesListProps } from "./places.model";

export const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  const columns: GridColDef[] = [
    { field: "building", headerName: "Корпус", flex: 100 },
    { field: "auditory", headerName: "Аудитория", flex: 100 },
  ];

  return (
    <div className="adminTable">
      <h3>Список аудиторий</h3>
      <DataGrid
        rows={places}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
};
