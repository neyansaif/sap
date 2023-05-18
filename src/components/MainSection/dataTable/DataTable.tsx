import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Box } from "@mui/material";
import { deleteStudent, updateStudent } from "../../../api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterPanel from "./FilterPanel";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import EditStudentDialog from "./EditStudentDialog";

const pageSizeOptions = [5, 10, 25, 50, 100];

const studyGroups: string[] = [
   "Typography",
   "Biologists",
   "Chemistry Capital",
   "Web designers",
   "Black magicians",
   "Lame gamer boys",
];

type Student = {
   id: number;
   name: string;
   gender: string;
   placedob: string;
   groups: string[];
};

type TableProps = {
   students: Student[];
   searchTerm: string;
   onFormSubmit: () => void;
};

const DataTable: React.FC<TableProps> = ({
   students,
   searchTerm,
   onFormSubmit,
}) => {
   const [allStudents, setAllStudents] = React.useState<Student[]>(students);
   console.log(allStudents);

   //delete
   const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
   const [deleteStudentId, setDeleteStudentId] = React.useState<number | null>(
      null
   );

   //update
   const [editStudent, setEditStudent] = React.useState<null | Student>(null);

   //Handle checkbox
   const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

   const filteredStudents: Student[] = students.filter(
      (student) =>
         student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (selectedGroups.length === 0 ||
            selectedGroups.some((group) => student.groups.includes(group)))
   );

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
         deleteStudent(deleteStudentId)
            .then(() => {
               const updatedStudents = students.filter(
                  (student) => student.id !== deleteStudentId
               );
               setAllStudents(updatedStudents);
               setOpenConfirmDialog(false);
               onFormSubmit();
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
      onFormSubmit();
   };

   const handleCancelDelete = () => {
      setOpenConfirmDialog(false);
   };

   const handleSave = () => {
      if (editStudent) {
         updateStudent(editStudent)
            .then((data) => {
               const updatedStudents = students.map((student) =>
                  student.id === data.id ? data : student
               );
               setAllStudents(updatedStudents);
               setEditStudent(null);
               onFormSubmit();
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
            <FilterPanel
               studyGroups={studyGroups}
               selectedGroups={selectedGroups}
               handleGroupChange={handleGroupChange}
            />
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
               <ConfirmDeleteDialog
                  openConfirmDialog={openConfirmDialog}
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={handleConfirmDelete}
               />
               <EditStudentDialog
                  editStudent={editStudent}
                  handleCancel={handleCancel}
                  handleSave={handleSave}
                  setEditStudent={setEditStudent}
               />
            </Box>
         </Grid>
      </Grid>
   );
};

export default DataTable;
