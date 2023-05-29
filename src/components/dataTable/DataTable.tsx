import React from "react";
import { useDeleteStudent } from "../../services/Hooks/useDeleteStudent";
import { useUpdateStudent } from "../../services/Hooks/useUpdateStudent";
import { EditStudent } from "../../types/EditStudent";
import { DataTableProps } from "../../types/DataTableProps";
import { studyGroups } from "../../constants/studyGroups";
import { pageSizeOptions } from "../../constants/pageSizeOptions";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import FilterPanel from "./FilterPanel";
import EditStudentForm from "./EditStudentForm";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, Box, Dialog } from "@mui/material";
import { Student } from "../../types/Student";

const DataTable: React.FC<DataTableProps> = ({ students, searchTerm }) => {
   const deleteMutation = useDeleteStudent(); // Use the custom delete mutation hook
   const updateMutation = useUpdateStudent(); // Use the custom update mutation hook

   //Handle checkbox
   const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

   const filteredStudents = students.filter(
      (student) =>
         student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         (selectedGroups.length === 0 ||
            selectedGroups.some((group) => student.groups.includes(group)))
   );

   //Handle Delete Dailog
   const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
   const [deleteStudentId, setDeleteStudentId] = React.useState<string | null>(
      null
   );

   //Handle Update
   const [editStudent, setEditStudent] = React.useState<null | EditStudent>(
      null
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
         deleteMutation.mutate(deleteStudentId); // Call the mutation function from the delete mutation hook
         setOpenConfirmDialog(false);
      }
   };

   const handleDelete = (id: string) => {
      setDeleteStudentId(id);
      setOpenConfirmDialog(true);
   };

   const handleCancelDelete = () => {
      setOpenConfirmDialog(false);
   };

   const handleSave = (values: EditStudent) => {
      if (editStudent) {
         updateMutation.mutate(values); // Call the mutation function from the update mutation hook
         setEditStudent(null);
      }
   };

   const handleEdit = (student: EditStudent) => {
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
         field: "combinedInfo",
         headerName: "Place and Date of Birth",
         width: 200,
         editable: true,
         renderCell: (params) => (
            <div>
               <span>{params.row.placeOfBirth}</span>
               <span> - </span>
               <span>{params.row.dateOfBirth}</span>
            </div>
         ),
      },

      {
         field: "groups",
         headerName: "GROUPS",
         width: 300,
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

   const rows = filteredStudents.map((student: Student) => {
      const formattedDateOfBirth = new Date(student.dateOfBirth)
         .toISOString()
         .split("T")[0];
      return {
         id: student._id,
         name: student.name,
         gender: student.gender,
         placeOfBirth: student.placeOfBirth,
         dateOfBirth: formattedDateOfBirth,
         groups: student.groups.map((group: string) => group),
      };
   });

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
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={pageSizeOptions}
               />
               <ConfirmDeleteDialog
                  openConfirmDialog={openConfirmDialog}
                  handleCancelDelete={handleCancelDelete}
                  handleConfirmDelete={handleConfirmDelete}
               />
               <Dialog open={!!editStudent} onClose={handleCancel}>
                  <EditStudentForm
                     editStudent={editStudent}
                     onSave={handleSave}
                     onCancel={handleCancel}
                  />
               </Dialog>
            </Box>
         </Grid>
      </Grid>
   );
};

export default DataTable;
