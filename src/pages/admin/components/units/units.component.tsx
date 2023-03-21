import React, { useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import "./units.styles.css";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions } from "@mui/material";
import { UnitsListProps } from "./units.model";
import { RouterLinks } from "../../../../constants";
import { UnitDto } from "../../../../types";
import { useModal } from "../../../../utils";
import { UpdateUnitForm } from "../update-unit";

export const UnitsList: React.FC<UnitsListProps> = ({ units, handleChange }) => {
  const navigate = useNavigate();
  const [selectedUnitData, setUnitData] = useState<UnitDto>();
  const [isOpen, toggleOpen] = useModal(false);
  const [isChanging, toggleChanging] = useModal(false);

  const handleGoToUnit = (id: GridRowId) => {
    navigate(`../${RouterLinks.Unit}/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Кратко", flex: 100 },
    { field: "fullName", headerName: "Полное название", flex: 100 },
  ];

  const handleUnitNavigate = (id: GridRowId) => {
    setUnitData(units.find((unitData) => unitData.id === id));
    toggleOpen();
  };

  return (
    <div className="adminTable">
      <h3>Список факультетов</h3>
      <DataGrid
        onRowClick={(rowData) => handleUnitNavigate(rowData.id)}
        rows={units}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
      />

      {selectedUnitData && (
        <Dialog open={isOpen} onClose={toggleOpen}>
          <div className="classNavigateDialogWrapper">
            <DialogActions>
              <Button
                onClick={() => handleGoToUnit(selectedUnitData?.id)}
                variant="contained"
                color="success"
              >
                Перейти к факультету
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

      {isChanging && selectedUnitData && (
        <UpdateUnitForm
          unitData={selectedUnitData}
          handleChange={handleChange}
          handleClose={toggleChanging}
        />
      )}
    </div>
  );
};
