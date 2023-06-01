import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { RegisterUser } from "./types/RegisterUser";
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

const validationSchema = Yup.object().shape({
   email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
   password: Yup.string().required("Password is required"),
});

const initialValues = {
   email: "",
   password: "",
};

export default function SignIn() {
   const [error, setError] = React.useState("");

   const handleSubmit = async (values: RegisterUser) => {
      try {
         const response = await axios.post(
            "http://localhost:8000/login-user",
            values
         );
         const { token } = response.data;
         localStorage.setItem("token", token);
         setError("");
         window.location.href = "/dashboard";
      } catch (error: any) {
         if (error.response) {
            setError(error.response.data.error);
         } else {
            setError("An error occurred");
         }
      }
   };

   const formik = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
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
               Sign in
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
               component="form"
               onSubmit={formik.handleSubmit}
               noValidate
               sx={{ mt: 1 }}
            >
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                     formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                     formik.touched.password && formik.errors.password
                        ? true
                        : false
                  }
                  helperText={formik.touched.password && formik.errors.password}
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formik.isValid}
               >
                  Sign In
               </Button>
               <Grid container>
                  <Grid item>
                     <Link
                        to="/signup"
                        style={{
                           textDecoration: "none",
                           color: "black",
                        }}
                     >
                        {"Don't have an account? Sign Up"}
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}
