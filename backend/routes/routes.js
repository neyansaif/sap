import express from "express";
import {
   addStudent,
   getStudents,
   updateStudent,
   deleteStudent,
} from "../controller/student-controller.js";

export const router = express.Router();

router.get("/students-data", getStudents);
router.post("/add-student", addStudent);
router.put("/update-student/:id", updateStudent);
router.delete("/delete-student/:id", deleteStudent);
