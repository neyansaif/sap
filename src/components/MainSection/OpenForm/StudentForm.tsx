import * as Yup from "yup";
import { useFormik } from "formik";
import { addStudent } from "../../../api/api";
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
   Select,
   MenuItem,
   InputLabel,
   Stack,
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

const initialValues = {
   id: 0,
   name: "",
   gender: "",
   placeOfBirth: "",
   dateOfBirth: "",
   groups: [],
};

type StudentFormProps = {
   onFormSubmit: () => void;
   handleClose: () => void;
};

const StudentForm: React.FC<StudentFormProps> = ({
   handleClose,
   onFormSubmit,
}) => {
   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
         try {
            await addStudent(values);
            handleClose();
            formik.setValues(initialValues);
            onFormSubmit();
         } catch (error) {
            console.error(`Failed to add student: ${error}`);
         }
      },
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
                  renderValue={(selected) => selected.join(", ")}
               >
                  <MenuItem value="Typography">Typography</MenuItem>
                  <MenuItem value="Biologists">Biologists</MenuItem>
                  <MenuItem value="Chemistry Capital">
                     Chemistry Capital
                  </MenuItem>
                  <MenuItem value="Web designers">Web designers</MenuItem>
                  <MenuItem value="Black magicians">Black magicians</MenuItem>
                  <MenuItem value="Lame gamer boys">Lame gamer boys</MenuItem>
               </Select>
               {formik.touched.groups && formik.errors.groups && (
                  <div>{formik.errors.groups}</div>
               )}
            </FormControl>
            <Stack spacing={2} direction="row" sx={{ p: 2 }}>
               <Button type="submit" variant="contained" color="success">
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
