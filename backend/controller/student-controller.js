import { Student } from "../model/student-schema.js";

export const getStudents = async (req, res) => {
   try {
      const students = await Student.find();
      res.json(students);
   } catch (error) {
      console.error("Failed to fetch students:", error);
      res.status(500).json({ error: "Server error" });
   }
};

export const addStudent = async (req, res) => {
   try {
      const studentData = req.body;
      const student = new Student(studentData);
      await student.save();
      res.status(201).json(student);
   } catch (error) {
      console.error("Failed to save student:", error);
      res.status(500).json({ error: "Failed to save student" });
   }
};

export const updateStudent = async (req, res) => {
   try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      if (!student) {
         return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
   } catch (error) {
      res.status(400).json({ error: "Failed to update student" });
   }
};

export const deleteStudent = async (req, res) => {
   try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
         return res.status(404).json({ error: "Student not found" });
      }
      res.sendStatus(204);
   } catch (error) {
      res.status(400).json({ error: "Failed to delete student" });
   }
};
