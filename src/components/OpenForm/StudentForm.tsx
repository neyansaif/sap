import * as Yup from "yup";
import { useFormik } from "formik";
import { Student } from "../../types/Student";
import { customAlphabet } from "nanoid";
import { useAddStudent } from "../../api/api";
import {
   Box,
   TextField,
   Button,
   Typography,
   FormControl,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
   InputLabel,
   Stack,
   Checkbox,
   FormGroup,
} from "@mui/material";

const groupsOptions = [
   "Typography",
   "Biologists",
   "Chemistry Capital",
   "Web designers",
   "Black magicians",
   "Lame gamer boys",
];

const validationSchema = Yup.object({
   name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z]+$/, "Name should contain only letters"),
   gender: Yup.string().required("Gender is required"),
   placeOfBirth: Yup.string().required("Place of birth is required"),
   dateOfBirth: Yup.string().required("Date of birth is required"),
   groups: Yup.array()
      .required("Groups are required")
      .min(1, "At least one group must be selected"),
});

const initialValues: Student = {
   id: "",
   name: "",
   gender: "",
   placeOfBirth: "",
   dateOfBirth: "",
   groups: [],
};

type StudentFormProps = {
   handleClose: () => void;
};

const StudentForm: React.FC<StudentFormProps> = ({ handleClose }) => {
   const { mutate: addStudent } = useAddStudent();

   const generateNumericId = customAlphabet("0123456789", 3);

   const handleSubmit = async (values: Student) => {
      try {
         await addStudent({ ...values, id: generateNumericId() });

         handleClose();
         formik.setValues(initialValues);
      } catch (error) {
         console.error(`Failed to add student: ${error}`);
      }
   };

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: handleSubmit,
   });

   return (
      <div>
         <Typography variant="h5">Add Student</Typography>
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
               <FormLabel component="legend">Gender</FormLabel>
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
                     formik.touched.placeOfBirth && formik.errors.placeOfBirth
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
                  {groupsOptions.map((option) => (
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
                                 formik.setFieldValue("groups", updatedGroups);
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

            <Stack spacing={2} direction="row" sx={{ p: 2 }}>
               <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={
                     !formik.isValid || formik.isSubmitting || !formik.dirty
                  }
               >
                  Submit
               </Button>

               <Button
                  onClick={formik.handleReset}
                  variant="contained"
                  color="error"
               >
                  Clear
               </Button>
            </Stack>
         </form>
      </div>
   );
};

export default StudentForm;
