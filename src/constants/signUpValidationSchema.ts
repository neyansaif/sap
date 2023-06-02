import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "First name should only contain alphabets")
        .required("First name is required"),
    lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Last name should only contain alphabets")
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
            "Password must contain at least one letter and one number"
        )
        .required("Password is required"),
});