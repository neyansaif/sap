import React, { useState, useEffect } from "react";
import Table from "./Table";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import OpenForm from "./OpenForm";

const Main = () => {
   const [students, setStudents] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const dataLength: number = students.length;

   const fetchData = async () => {
      try {
         const res = await fetch("http://localhost:8000/students");
         const data = await res.json();
         setStudents(data);
      } catch (error) {
         console.log(`Server Error While Fetching Students Data ${error}`);
      }
   };

   useEffect(() => {
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
            <Table students={students} searchTerm={searchTerm} />
         </Paper>
      </Grid>
   );
};

export default Main;
