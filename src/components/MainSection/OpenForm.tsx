import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
   form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(2),
      margin: "0 auto",
      maxWidth: 500,
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
   },
   formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
      width: "100%",
   },
   selectField: {
      minWidth: 200,
   },
   textField: {
      minWidth: 200,
   },
   submitButton: {
      marginRight: theme.spacing(2),
   },
}));

interface FormData {
   name: string;
   gender: string;
   placedob: string;
   groups: string[];
}

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
   const classes = useStyles();

   const handleSearch = (e: any) => {
      const searchTerm = e.target.value;
      props.onSearch(searchTerm);
   };

   const [formData, setFormData] = useState<FormData>(initialFormData);

   const [showModal, setShowModal] = useState(false);

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
         const response = await fetch("http://localhost:8000/students", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         handleClose();
         setFormData(initialFormData);
         props.onFormSubmit();

         if (!response.ok) {
            throw new Error("Failed to add student");
         }
      } catch (error) {
         console.error(`Failed to add student ${error}`);
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
               <form className={classes.form} onSubmit={handleSubmit}>
                  <div className={classes.formGroup}>
                     <InputLabel>Name</InputLabel>
                     <TextField
                        className={classes.textField}
                        variant="outlined"
                        placeholder="Enter Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className={classes.formGroup}>
                     <InputLabel>Gender</InputLabel>
                     <Select
                        className={classes.selectField}
                        variant="outlined"
                        name="gender"
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
                  <div className={classes.formGroup}>
                     <InputLabel>Place and Date of Birth</InputLabel>
                     <TextField
                        className={classes.textField}
                        variant="outlined"
                        placeholder="Lahore, 01/01/2000"
                        name="placedob"
                        value={formData.placedob}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  <div className={classes.formGroup}>
                     <InputLabel>Groups</InputLabel>
                     <Select
                        variant="outlined"
                        name="groups"
                        value={formData.groups}
                        onChange={handleChange}
                        multiple
                        required
                        MenuProps={{
                           disableAutoFocusItem: true,
                        }}
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
                     <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="success"
                        type="submit"
                     >
                        Submit
                     </Button>
                     <Button
                        className={classes.submitButton}
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
