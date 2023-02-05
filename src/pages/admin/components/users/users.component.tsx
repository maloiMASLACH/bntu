import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./users.styles.css";
import { UsersListProps } from "./users.model";

export const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const columns: GridColDef[] = [
    {
      field: "uid",
      headerName: "id",
      flex: 100,
      hide: true,
    },
    { field: "firstName", headerName: "Имя", flex: 100 },
    { field: "lastName", headerName: "Фамилия", flex: 100 },
    { field: "facultyName", headerName: "Факультет", flex: 100 },
    { field: "group", headerName: "Группа", flex: 100 },
    {
      field: "email",
      headerName: "Почта",
      flex: 100,
    },
  ];

  return (
    <div className="adminTable">
      <h3>Список пользователей</h3>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />
    </div>
  );
};
