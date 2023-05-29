import React from "react";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import OpenForm from "./OpenForm/OpenForm";
import DataTable from "./dataTable/DataTable";

import { useFetchStudentsData } from "../services/Hooks/useFetchStudentsData";

const Section = () => {
   const {
      isLoading,
      isError,
      error,
      data: students = [],
   } = useFetchStudentsData();
   const [searchTerm, setSearchTerm] = React.useState("");

   const handleSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };

   if (isLoading) {
      return (
         <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="secondary" />
         </Box>
      );
   }

   if (isError) {
      const errorMessage = (error as Error).message || "An error occurred";
      return <Box>Error: {errorMessage}</Box>;
   }

   return (
      <Grid>
         <Paper sx={{ p: 4 }}>
            <OpenForm onSearch={handleSearch} dataLength={students.length} />
            <br />
            <DataTable students={students} searchTerm={searchTerm} />
         </Paper>
      </Grid>
   );
};

export default Section;
