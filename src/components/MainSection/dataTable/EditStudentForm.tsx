import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
   FormControl,
   TextField,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   FormControlLabel,
   Radio,
   RadioGroup,
   InputLabel,
   Select,
   MenuItem,
   Box,
} from "@mui/material";

const validationSchema = Yup.object({
   name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z]+$/, "Name should contain only letters"),
   gender: Yup.string().required("Gender is required"),
   placeOfBirth: Yup.string().required("Place of birth is required"),
   dateOfBirth: Yup.string().required("Date of birth is required"),
   groups: Yup.array().required("Groups are required"),
});

type Student = {
   id: number;
   name: string;
   gender: string;
   placeOfBirth: string;
   dateOfBirth: string;
   groups: string[];
};

type EditStudentFormProps = {
   editStudent: Student | null;
   onSave: (values: Student) => void;
   onCancel: () => void;
};

const EditStudentForm: React.FC<EditStudentFormProps> = ({
   editStudent,
   onSave,
   onCancel,
}) => {
   const formik = useFormik({
      initialValues: {
         id: editStudent?.id || 0,
         name: editStudent?.name || "",
         gender: editStudent?.gender || "",
         placeOfBirth: editStudent?.placeOfBirth || "",
         dateOfBirth: editStudent?.dateOfBirth || "",
         groups: editStudent?.groups || [],
      },
      validationSchema,
      onSubmit: onSave,
   });

   return (
      <>
         <DialogTitle>Edit Student</DialogTitle>
         <DialogContent>
            <form onSubmit={formik.handleSubmit}>
               <Box sx={{ p: 2 }}>
                  <TextField
                     id="name"
                     name="name"
                     label="Name"
                     fullWidth
                     value={formik.values.name}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={formik.touched.name && Boolean(formik.errors.name)}
                     helperText={formik.touched.name && formik.errors.name}
                  />
               </Box>

               <Box sx={{ p: 2 }}>
                  <InputLabel component="legend">Gender</InputLabel>
                  <RadioGroup
                     id="gender"
                     name="gender"
                     value={formik.values.gender}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                  >
                     <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                     />
                     <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                     />
                     <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                     />
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                     <div>{formik.errors.gender}</div>
                  )}
               </Box>

               <FormControl sx={{ p: 2 }}>
                  <TextField
                     id="placeOfBirth"
                     name="placeOfBirth"
                     label="Place of Birth"
                     type="text"
                     fullWidth
                     value={formik.values.placeOfBirth}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={
                        formik.touched.placeOfBirth &&
                        Boolean(formik.errors.placeOfBirth)
                     }
                     helperText={
                        formik.touched.placeOfBirth &&
                        formik.errors.placeOfBirth
                     }
                  />
               </FormControl>

               <FormControl sx={{ p: 2, minWidth: 120 }}>
                  <TextField
                     id="dateOfBirth"
                     name="dateOfBirth"
                     label="Date of Birth"
                     type="date"
                     fullWidth
                     value={formik.values.dateOfBirth}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     error={
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth)
                     }
                     helperText={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                     }
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
               </FormControl>

               <FormControl
                  error={formik.touched.groups && Boolean(formik.errors.groups)}
                  fullWidth
               >
                  <InputLabel id="groups-label">Groups</InputLabel>
                  <Select
                     id="groups"
                     name="groups"
                     multiple
                     labelId="groups-label"
                     value={formik.values.groups}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     renderValue={(selected) =>
                        (selected as string[]).join(", ")
                     }
                  >
                     <MenuItem value="Typography">Typography</MenuItem>
                     <MenuItem value="Biologists">Biologists</MenuItem>
                     <MenuItem value="Chemistry Capital">
                        Chemistry Capital
                     </MenuItem>
                     <MenuItem value="Web designers">Web designers</MenuItem>
                     <MenuItem value="Black magicians">
                        Black magicians
                     </MenuItem>
                     <MenuItem value="Lame gamer boys">
                        Lame gamer boys
                     </MenuItem>
                  </Select>
                  {formik.touched.groups && formik.errors.groups && (
                     <div>{formik.errors.groups}</div>
                  )}
               </FormControl>

               <DialogActions>
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button type="submit" color="success" variant="contained">
                     Save
                  </Button>
               </DialogActions>
            </form>
         </DialogContent>
      </>
   );
};

export default EditStudentForm;
