import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { signUpValidationSchema } from "./constants/signUpValidationSchema";
import { signUpInitialValues } from "./constants/signUpInitialValues";
import { Link } from "react-router-dom";
import { RegisterUser } from "./types/RegisterUser";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
   TextField,
   Grid,
   Box,
   Typography,
   Container,
   Button,
   Avatar,
   Alert,
   CssBaseline,
} from "@mui/material";

export default function SignUp() {
   const [error, setError] = React.useState("");

   const handleSubmit = async (values: RegisterUser) => {
      try {
         await axios.post("http://localhost:8000/register-user", values);
         formik.setValues(signUpInitialValues);
         setError("");
         window.location.href = "/login";
      } catch (error: any) {
         if (error.response) {
            setError(error.response.data.error);
         } else {
            setError("An error occurred");
         }
      }
   };
   const formik = useFormik({
      initialValues: signUpInitialValues,
      validationSchema: signUpValidationSchema,
      onSubmit: handleSubmit,
   });

   return (
      <Container component="main" maxWidth="xs" sx={{ height: "80vh" }}>
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}
         >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
               component="form"
               noValidate
               onSubmit={formik.handleSubmit}
               sx={{ mt: 3 }}
            >
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.firstName && formik.errors.firstName
                              ? true
                              : false
                        }
                        helperText={
                           formik.touched.firstName && formik.errors.firstName
                        }
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.lastName && formik.errors.lastName
                              ? true
                              : false
                        }
                        helperText={
                           formik.touched.lastName && formik.errors.lastName
                        }
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.email && formik.errors.email
                              ? true
                              : false
                        }
                        helperText={formik.touched.email && formik.errors.email}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                           formik.touched.password && formik.errors.password
                              ? true
                              : false
                        }
                        helperText={
                           formik.touched.password && formik.errors.password
                        }
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Sign Up
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link
                        to="/login"
                        style={{
                           textDecoration: "none",
                           color: "black",
                        }}
                     >
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}
