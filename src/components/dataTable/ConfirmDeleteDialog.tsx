import React from "react";
import { ConfirmDeleteDialogProps } from "../../types/ConfirmDeleteDialogProps";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Typography,
} from "@mui/material";

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
   openConfirmDialog,
   handleCancelDelete,
   handleConfirmDelete,
}) => {
   return (
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
         <DialogTitle>Confirm Delete</DialogTitle>
         <DialogContent>
            <Typography variant="body1">
               Are you sure you want to delete this record?
            </Typography>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button
               onClick={handleConfirmDelete}
               variant="contained"
               color="error"
            >
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default ConfirmDeleteDialog;
