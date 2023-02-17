import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./users.styles.css";
import { UsersListProps } from "./users.model";
import { FirebaseContext } from "../../../../utils";
import { UserDto } from "../../../../types";

const useGetUserData = (userId: string) => {
  const firebase = useContext(FirebaseContext);

  const [user, setUser] = useState<UserDto>();

  useEffect(() => {
    firebase.user(userId).once("value", (snapshot) => {
      const response: UserDto = snapshot.val();
      setUser(response);
    });
  }, []);

  if (user) {
    return { id: user.uid, facultyName: user.faculty.name, ...user };
  }
  return undefined;
};

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

  const usersDataList = users.map((userId) => useGetUserData(userId));

  const usersData = usersDataList.filter((user) => !!user);

  return (
    <div className="classUserTable">
      {!!usersData.length && (
        <>
          <h3>Список пользователей</h3>
          <DataGrid
            rows={usersData}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
          />
        </>
      )}
    </div>
  );
};
