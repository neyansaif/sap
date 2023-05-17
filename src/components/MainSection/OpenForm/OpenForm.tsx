import React from "react";
import { addStudent } from "../../../api/api";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
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

type FormData = {
   name: string;
   gender: string;
   placedob: string;
   groups: string[];
};

const initialFormData: FormData = {
   name: "",
   gender: "",
   placedob: "",
   groups: [],
};

const genderOptions = [
   { value: "Male", label: "Male" },
   { value: "Female", label: "Female" },
   { value: "Other", label: "Other" },
];

const groupOptions = [
   { value: "Typography", label: "Typography" },
   { value: "Biologists", label: "Biologists" },
   { value: "Chemistry Capital", label: "Chemistry Capital" },
   { value: "Web designers", label: "Web designers" },
   { value: "Black magicians", label: "Black magicians" },
   { value: "Lame gamer boys", label: " Lame gamer boys" },
];

const OpenForm = (props: any) => {
   const handleSearch = (e: any) => {
      const searchTerm = e.target.value;
      props.onSearch(searchTerm);
   };

   const [formData, setFormData] = React.useState<FormData>(initialFormData);

   const [showModal, setShowModal] = React.useState(false);

   const handleClose = () => setShowModal(false);
   const handleShow = () => setShowModal(true);

   const handleChange = (
      event: React.ChangeEvent<{ name?: string; value: unknown }>
   ) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
         ...prevFormData,
         [name!]: value,
      }));
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
         !formData.name ||
         !/^[a-zA-Z]+$/.test(formData.name) || // Only accepts characters (no numbers or special characters)
         !formData.gender ||
         !formData.placedob ||
         formData.groups.length === 0
      ) {
         alert(
            "Form validation error: Please fill in all required fields and ensure the name field contains only characters."
         );
         return;
      }

      try {
         await addStudent(formData as any);
         handleClose();
         setFormData(initialFormData);
         props.onFormSubmit();
      } catch (error) {
         // Handle the error in the main component
         console.error(`Failed to add student: ${error}`);
      }
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
                        {props.dataLength} Students
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
               <Typography variant="h6" fontSize="1.5rem" fontWeight={700}>
                  Add Student
               </Typography>
               <form onSubmit={handleSubmit}>
                  <div>
                     <InputLabel>Name</InputLabel>
                     <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div>
                     <InputLabel>Gender</InputLabel>
                     <Select
                        variant="outlined"
                        name="gender"
                        fullWidth
                        value={formData.gender}
                        onChange={handleChange}
                        required
                     >
                        {genderOptions.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </div>
                  <div>
                     <InputLabel>Place and Date of Birth</InputLabel>
                     <TextField
                        variant="outlined"
                        placeholder="ex:Lahore, 01/01/2000"
                        name="placedob"
                        fullWidth
                        value={formData.placedob}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div>
                     <InputLabel>Groups</InputLabel>
                     <Select
                        variant="outlined"
                        name="groups"
                        value={formData.groups}
                        onChange={handleChange}
                        multiple
                        fullWidth
                     >
                        {groupOptions.map((option) => (
                           <MenuItem key={option.value} value={option.value}>
                              {option.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </div>

                  <Box
                     display={"flex"}
                     justifyContent={"center"}
                     gap={2}
                     marginTop={3}
                  >
                     <Button variant="contained" color="success" type="submit">
                        Submit
                     </Button>
                     <Button
                        variant="contained"
                        color="error"
                        onClick={() => setFormData(initialFormData)}
                     >
                        Clear
                     </Button>
                  </Box>
               </form>
            </Box>
         </Modal>
      </>
   );
};

export default OpenForm;
