import React from "react";
import {
  Button, Dialog, DialogActions, DialogTitle
} from "@mui/material";

import { AlertProps } from "./alert.model";

export const AlertWindow: React.FC<AlertProps> = ({
  toggleClose,
  message,
}) => {
  return (
    <Dialog open onClose={toggleClose}>
      <DialogTitle>{message}</DialogTitle>

      <DialogActions>
        <Button onClick={toggleClose} color="success">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
