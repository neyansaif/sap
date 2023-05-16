import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   TextField,
   Typography,
   Grid,
   Box,
   FormGroup,
   FormControlLabel,
   Checkbox,
} from "@mui/material";

const pageSizeOptions = [5, 10, 25, 50, 100];

interface Student {
   id: number;
   name: string;
   gender: string;
   placedob: string;
   groups: string[];
}

interface TableProps {
   students: Student[];
   searchTerm: string;
}

const Table: React.FC<TableProps> = ({ students, searchTerm }) => {
   const [allStudents, setAllStudents] = useState<Student[]>(students);
   const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
   console.log(allStudents);
   const studyGroups: string[] = [
      "Typography",
      "Biologists",
      "Chemistry Capital",
      "Web designers",
      "Black magicians",
      "Lame gamer boys",
   ];

   const filteredStudents: Student[] = students.filter(
      (student) =>
         student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (selectedGroups.length === 0 ||
            selectedGroups.some((group) => student.groups.includes(group)))
   );

   //delete
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
   const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);

   //update
   const [editStudent, setEditStudent] = useState<any>(null);

   const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      if (checked) {
         setSelectedGroups((prevSelectedGroups) => [
            ...prevSelectedGroups,
            value,
         ]);
      } else {
         setSelectedGroups((prevSelectedGroups) =>
            prevSelectedGroups.filter((group) => group !== value)
         );
      }
   };

   const handleConfirmDelete = () => {
      if (deleteStudentId) {
         fetch(`http://localhost:8000/students/${deleteStudentId}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               const updatedStudents = students.filter(
                  (student) => student.id !== deleteStudentId
               );
               setAllStudents(updatedStudents);
               setOpenConfirmDialog(false);
            })
            .catch((error) =>
               console.log(
                  `Server Error While Deleting the Student Record ${error}`
               )
            );
      }
   };

   const handleDelete = (id: number) => {
      setDeleteStudentId(id);
      setOpenConfirmDialog(true);
   };

   const handleCancelDelete = () => {
      setOpenConfirmDialog(false);
   };

   const handleSave = () => {
      if (editStudent) {
         fetch(`http://localhost:8000/students/${editStudent.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(editStudent),
         })
            .then((res) => res.json())
            .then((data) => {
               const updatedStudents = students.map((student) =>
                  student.id === data.id ? data : student
               );
               setAllStudents(updatedStudents);
               setEditStudent(null);
            })
            .catch((error) =>
               console.log(
                  `Server Error While Updating the Student Record ${error}`
               )
            );
      }
   };

   const handleEdit = (student: Student) => {
      setEditStudent(student);
   };

   const handleCancel = () => {
      setEditStudent(null);
   };

   const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "NAME", width: 150, editable: true },
      { field: "gender", headerName: "GENDER", width: 150, editable: true },
      {
         field: "placedob",
         headerName: "PLACE & DATE OF BIRTH",
         width: 220,
         editable: true,
      },
      {
         field: "groups",
         headerName: "GROUPS",
         width: 220,
         editable: true,
      },
      {
         field: "actions",
         headerName: "Actions",
         width: 200,
         renderCell: (params) => (
            <>
               <EditIcon
                  sx={{
                     color: "green",
                     cursor: "pointer",
                     marginRight: "8px",
                  }}
                  onClick={() => handleEdit(params.row)}
               />
               <DeleteIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(params.row.id)}
               />
            </>
         ),
      },
   ];

   return (
      <Grid container>
         <Grid item xs={12} md={3}>
            <Box style={{ height: 400, width: "100%" }}>
               <Typography variant="body2" gutterBottom>
                  FILTERS FOR STUDY GROUPS
               </Typography>
               <FormGroup>
                  {studyGroups.map((group) => (
                     <FormControlLabel
                        key={group}
                        control={
                           <Checkbox
                              checked={selectedGroups.includes(group)}
                              onChange={handleGroupChange}
                              value={group}
                           />
                        }
                        label={group}
                     />
                  ))}
               </FormGroup>
            </Box>
         </Grid>
         <Grid item xs={12} md={9}>
            <Box style={{ height: 450, width: "100%" }}>
               <DataGrid
                  rows={filteredStudents.map((student) => ({
                     id: student.id,
                     name: student.name,
                     gender: student.gender,
                     placedob: student.placedob,
                     groups: Array.isArray(student.groups)
                        ? student.groups.join(", ")
                        : student.groups,
                     //
                  }))}
                  columns={columns}
                  pageSizeOptions={pageSizeOptions}
               />
               <Box>
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
               </Box>
               <Box>
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
                        <Button
                           onClick={handleSave}
                           color="success"
                           variant="contained"
                        >
                           Save
                        </Button>
                     </DialogActions>
                  </Dialog>
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};

export default Table;
