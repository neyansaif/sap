import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
import StudentForm from "./StudentForm";

type OpenFormProps = {
   onSearch: (searchTerm: string) => void;
   onFormSubmit: () => void;
   dataLength: number;
};

const OpenForm: React.FC<OpenFormProps> = ({
   onSearch,
   onFormSubmit,
   dataLength,
}) => {
   const [showModal, setShowModal] = React.useState(false);
   const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);

   const handleSearch = (e: any) => {
      const searchTerm = e.target.value;
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
                        {dataLength} Students
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
               <StudentForm
                  onFormSubmit={onFormSubmit}
                  handleClose={handleClose}
               />
            </Box>
         </Modal>
      </>
   );
};

export default OpenForm;
