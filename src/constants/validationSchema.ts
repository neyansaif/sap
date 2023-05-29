import * as Yup from "yup";

export const validationSchema = Yup.object({
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