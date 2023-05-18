import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   TextField,
} from "@mui/material";

type Student = {
   id: number;
   name: string;
   gender: string;
   placedob: string;
   groups: string[];
};

type EditStudentDialogProps = {
   editStudent: Student | any;
   handleCancel: () => void;
   handleSave: () => void;
   setEditStudent: (student: Student | null) => void;
};

const EditStudentDialog: React.FC<EditStudentDialogProps> = ({
   editStudent,
   handleCancel,
   handleSave,
   setEditStudent,
}) => {
   return (
      <Dialog open={!!editStudent} onClose={handleCancel}>
         <DialogTitle>Edit Student</DialogTitle>
         <DialogContent>
            <TextField
               autoFocus
               margin="dense"
               label="Name"
               type="text"
               fullWidth
               value={editStudent?.name}
               onChange={(e) =>
                  setEditStudent({
                     ...editStudent,
                     name: e.target.value,
                  })
               }
            />
            <TextField
               margin="dense"
               label="Gender"
               type="text"
               fullWidth
               value={editStudent?.gender}
               onChange={(e) =>
                  setEditStudent({
                     ...editStudent,
                     gender: e.target.value,
                  })
               }
            />
            <TextField
               margin="dense"
               label="Place & Date of Birth"
               type="text"
               fullWidth
               value={editStudent?.placedob}
               onChange={(e) =>
                  setEditStudent({
                     ...editStudent,
                     placedob: e.target.value,
                  })
               }
            />
            <TextField
               margin="dense"
               label="Groups"
               type="text"
               fullWidth
               value={editStudent?.groups}
               onChange={(e) =>
                  setEditStudent({
                     ...editStudent,
                     groups: e.target.value,
                  })
               }
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave} color="success" variant="contained">
               Save
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default EditStudentDialog;
