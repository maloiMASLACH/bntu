import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import "./classes.styles.css";
import { useNavigate } from "react-router-dom";
import { ClassesListProps, MasterDataProps } from "./classes.model";
import { RouterLinks } from "../../../../constants";
import { UserDto } from "../../../../types";
import { FirebaseContext } from "../../../../utils";
import { AuthUserContext } from "../../../../context";

const MasterData: React.FC<MasterDataProps> = ({ userId }) => {
  const [userData, setUserData] = useState<UserDto>();

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase
      .user(`${userId}`)
      .once("value", (snapshot) => setUserData(snapshot.val()));
  }, []);

  return <p>{`${userData?.firstName} ${userData?.lastName}`}</p>;
};

export const ClassesList: React.FC<ClassesListProps> = ({ classes }) => {
  const navigate = useNavigate();

  const activeUser = useContext(AuthUserContext);

  const handleGoToClass = (id: GridRowId) => {
    navigate(`../${RouterLinks.Class}/${id}`);
  };

  const ownClasses = classes.filter(
    (classData) => classData.masterId === activeUser?.userId
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      flex: 100,
      hide: true,
    },
    {
      field: "name",
      headerName: "Название",
      flex: 100,
    },
    {
      field: "masterId",
      headerName: "Руководитель",
      flex: 100,
      renderCell: (rowData) => <MasterData userId={rowData.value} />,
    },
    { field: "date", headerName: "Дата", flex: 100 },
    { field: "place", headerName: "Место", flex: 100 },
    { field: "units", headerName: "Факульутеты", flex: 100 },
  ];

  return (
    <>
      <div className="adminTable">
        <h3>Список всех занятий</h3>
        <DataGrid
          onRowClick={(rowData) => handleGoToClass(rowData.id)}
          rows={classes}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
      </div>
      {ownClasses && (
        <div className="adminTable">
          <h3>Список ваших занятий</h3>
          <DataGrid
            onRowClick={(rowData) => handleGoToClass(rowData.id)}
            rows={ownClasses}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
          />
        </div>
      )}
    </>
  );
};
