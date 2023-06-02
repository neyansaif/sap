import React from "react";
import { useNavigate } from "react-router-dom";
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

   const nagivate = useNavigate();
   const tokenExpirationTimer = React.useRef<NodeJS.Timeout | null>(null);

   const handleActivity = () => {
      if (tokenExpirationTimer.current) {
         clearTimeout(tokenExpirationTimer.current);
      }
      startTokenExpirationTimer();
   };

   const startTokenExpirationTimer = () => {
      tokenExpirationTimer.current = setTimeout(() => {
         localStorage.removeItem("token");
         nagivate("/");
      }, 30000);
   };

   React.useEffect(() => {
      startTokenExpirationTimer();

      return () => {
         if (tokenExpirationTimer.current) {
            clearTimeout(tokenExpirationTimer.current);
         }
      };
   });
   return (
      <Grid onMouseMove={handleActivity} onClick={handleActivity}>
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
