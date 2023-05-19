import React from "react";
import { fetchStudentsData } from "../../api/api";
import { Grid, Paper } from "@mui/material";
import OpenForm from "./OpenForm/OpenForm";
import Datatable from "./dataTable/DataTable";

type Student = {
   id: number;
   name: string;
   gender: string;
   placeOfBirth: string;
   dateOfBirth: string;
   groups: string[];
};

const Main = () => {
   const [students, setStudents] = React.useState<Student[]>([]);
   const [searchTerm, setSearchTerm] = React.useState("");
   const dataLength: number = students.length;

   const fetchData = async () => {
      try {
         const data = await fetchStudentsData();
         setStudents(data);
      } catch (error) {
         console.log(`Error while fetching students data: ${error}`);
      }
   };

   React.useEffect(() => {
      fetchData();
   }, []);

   const handleSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };

   return (
      <Grid>
         <Paper sx={{ p: 4 }}>
            <OpenForm
               onSearch={handleSearch}
               onFormSubmit={fetchData}
               dataLength={dataLength}
            />
            <br />
            <Datatable
               students={students}
               onFormSubmit={fetchData}
               searchTerm={searchTerm}
            />
         </Paper>
      </Grid>
   );
};

export default Main;
