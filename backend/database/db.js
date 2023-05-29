import mongoose from "mongoose";

export const connection = async (username, password) => {
   const URL = `mongodb+srv://${username}:${password}@students.wqt84it.mongodb.net/CRUD-APPLICATION?retryWrites=true&w=majority`;
   try {
      await mongoose.connect(URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("Database connected");
   } catch (error) {
      console.log(`Error while connecting to database: ${error}`);
   }
};
