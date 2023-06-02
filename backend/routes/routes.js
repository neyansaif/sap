import express from "express";
import { authenticateMiddleware } from "../middleware/authentication.js";

import {
   registerUser,
   loginUser,
} from "../controller/registration-controller.js";
import {
   addStudent,
   getStudents,
   updateStudent,
   deleteStudent,
} from "../controller/student-controller.js";

export const router = express.Router();

// For User Registration
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);

// For Student CRUD operations
router.use(authenticateMiddleware);
router.get("/students-data", getStudents);
router.post("/add-student", addStudent);
router.put("/update-student/:id", updateStudent);
router.delete("/delete-student/:id", deleteStudent);
