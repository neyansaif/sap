import React from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Typography,
} from "@mui/material";

type ConfirmDeleteDialogProps = {
   openConfirmDialog: boolean;
   handleCancelDelete: () => void;
   handleConfirmDelete: () => void;
};

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = (props) => {
   const { openConfirmDialog, handleCancelDelete, handleConfirmDelete } = props;

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
