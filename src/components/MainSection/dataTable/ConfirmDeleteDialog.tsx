import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Typography,
} from "@mui/material";

const ConfirmDeleteDialog = (props: any) => {
   return (
      <Dialog open={props.openConfirmDialog} onClose={props.handleCancelDelete}>
         <DialogTitle>Confirm Delete</DialogTitle>
         <DialogContent>
            <Typography variant="body1">
               Are you sure you want to delete this record?
            </Typography>
         </DialogContent>
         <DialogActions>
            <Button onClick={props.handleCancelDelete}>Cancel</Button>
            <Button
               onClick={props.handleConfirmDelete}
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
