import React from "react";
import { Grid, Paper } from "@mui/material";
import OpenForm from "./components/openForm/OpenForm";
import DataTable from "./components/dataTable/DataTable";

import { useFetchStudentsData } from "./services/Hooks/useFetchStudentsData";

const Section = () => {
   const { isLoading, error, data: students = [] } = useFetchStudentsData();
   const [searchTerm, setSearchTerm] = React.useState("");

   const handleSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };

   return (
      <Grid>
         <Paper sx={{ p: 4 }}>
            <OpenForm onSearch={handleSearch} dataLength={students.length} />
            <br />
            <DataTable
               students={students}
               isLoading={isLoading}
               error={error}
               searchTerm={searchTerm}
            />
         </Paper>
      </Grid>
   );
};

export default Section;
