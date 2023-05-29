import React from "react";
import { useFormik } from "formik";
import { EditStudentFormProps } from "../../types/EditStudentFormProps";
import { studyGroups } from "../../constants/studyGroups";
import { validationSchema } from "../../constants/validationSchema";
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
   Box,
   FormGroup,
   Checkbox,
} from "@mui/material";

const EditStudentForm: React.FC<EditStudentFormProps> = ({
   editStudent,
   onSave,
   onCancel,
}) => {
   const formik = useFormik({
      initialValues: {
         id: editStudent?.id || "",
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

               <InputLabel id="groups-label">Groups</InputLabel>
               <FormControl sx={{ p: 2, minWidth: 120 }}>
                  <FormGroup row>
                     {studyGroups.map((option) => (
                        <FormControlLabel
                           key={option}
                           control={
                              <Checkbox
                                 name="groups"
                                 value={option}
                                 checked={formik.values.groups.includes(option)}
                                 onChange={(event) => {
                                    const value = event.target.value;
                                    const updatedGroups =
                                       formik.values.groups.includes(value)
                                          ? formik.values.groups.filter(
                                               (group) => group !== value
                                            )
                                          : [...formik.values.groups, value];
                                    formik.setFieldValue(
                                       "groups",
                                       updatedGroups
                                    );
                                 }}
                                 onBlur={formik.handleBlur}
                              />
                           }
                           label={option}
                        />
                     ))}
                  </FormGroup>
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
