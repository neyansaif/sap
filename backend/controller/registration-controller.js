import { User } from "../model/user-schema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// For User Registration:
export const registerUser = async (req, res) => {
   const { firstName, lastName, email, password } = req.body;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(409).json({ error: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      });
      await user.save({
         firstName,
         lastName,
         email,
         password: hashedPassword,
      });

      res.status(201).json({ message: "User created successfully" });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
   }
};

// For User Login:
export const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
         return res
            .status(401)
            .json({ error: "Invalid credentials!! email does not match" });
      }

      // Check the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res
            .status(401)
            .json({ error: "Invalid credentials!! password does not match" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, "secretkey");

      res.json({ token });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
   }
};
