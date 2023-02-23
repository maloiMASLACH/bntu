import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import "./classes.styles.css";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, Button } from "@mui/material";
import { ClassesListProps, MasterDataProps } from "./classes.model";
import { RouterLinks } from "../../../../constants";
import { ClassDto, UserDto } from "../../../../types";
import { FirebaseContext, useModal } from "../../../../utils";
import { AuthUserContext } from "../../../../context";
import { UpdateClassForm } from "../update-class";

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

export const ClassesList: React.FC<ClassesListProps> = ({
  classes,
  units,
  users,
  places,
  handleChange,
}) => {
  const navigate = useNavigate();

  const activeUser = useContext(AuthUserContext);

  const [isOpen, toggleOpen] = useModal(false);
  const [isChanging, toggleChanging] = useModal(false);

  const [selectedClassData, setClassData] = useState<ClassDto>();

  const ownClasses = classes.filter(
    (classData) => classData.masterId === activeUser?.userId
  );

  const handleGoToClass = (id: GridRowId) => {
    navigate(`../${RouterLinks.Class}/${id}`);
  };

  const handleClassNavigate = (id: GridRowId) => {
    setClassData(classes.find((classData) => classData.id === id));
    toggleOpen();
  };

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
            onRowClick={(rowData) => handleClassNavigate(rowData.id)}
            rows={ownClasses}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
          />
        </div>
      )}
      {selectedClassData && (
        <Dialog open={isOpen} onClose={toggleOpen}>
          <div className="classNavigateDialogWrapper">
            <DialogActions>
              <Button
                onClick={() => handleGoToClass(selectedClassData?.id)}
                variant="contained"
                color="success"
              >
                Перейти на занятие
              </Button>
              <Button
                onClick={() => {
                  toggleOpen();
                  toggleChanging();
                }}
                variant="contained"
                color="success"
              >
                Редактировать
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      )}

      {isChanging && selectedClassData && (
        <UpdateClassForm
          classData={selectedClassData}
          handleChange={handleChange}
          handleClose={toggleChanging}
          units={units}
          users={users}
          places={places}
        />
      )}
    </>
  );
};
