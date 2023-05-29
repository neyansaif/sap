import React, { ChangeEvent } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { OpenFormProps } from "../../types/OpenFormProps";
import StudentForm from "./StudentForm";
import {
   TextField,
   InputAdornment,
   Button,
   Typography,
   Box,
   Icon,
   Stack,
   Modal,
   Grid,
} from "@mui/material";

const OpenForm: React.FC<OpenFormProps> = ({ onSearch, dataLength }) => {
   const [showModal, setShowModal] = React.useState(false);
   const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);

   const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value;
      onSearch(searchTerm);
   };

   return (
      <>
         <Grid container sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={3}>
               <Box>
                  <Typography variant="body2" gutterBottom>
                     Search For Name
                  </Typography>
                  <TextField
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                     type="text"
                     placeholder="Search by name"
                     onChange={handleSearch}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Stack direction="row" spacing={2}>
                  <Box>
                     <Typography variant="h6" fontWeight={700}>
                        <Icon
                           component={PersonOutlineIcon}
                           fontSize="small"
                           style={{ marginRight: "0.5rem" }}
                        />
                        {dataLength} {dataLength > 1 ? "Students" : "Student"}
                     </Typography>
                  </Box>
                  <Box>
                     <Button
                        startIcon={<AddBoxIcon />}
                        onClick={handleShow}
                        variant="contained"
                     >
                        New From
                     </Button>
                  </Box>
               </Stack>
            </Grid>
         </Grid>
         <Modal open={showModal} onClose={handleClose}>
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  maxWidth: 600,
                  width: "100%",
               }}
            >
               <StudentForm handleClose={handleClose} />
            </Box>
         </Modal>
      </>
   );
};

export default OpenForm;
