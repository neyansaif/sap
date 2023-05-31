import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
   const token = req.headers.authorization;

   try {
      if (!token) {
         throw new Error("No token provided");
      }

      // Remove "Bearer " from the token string
      const tokenString = token.replace("Bearer ", "");

      // Verify the token
      const decodedToken = jwt.verify(tokenString, "secretkey");

      // Add the user ID to the request object
      req.userId = decodedToken.userId;

      next();
   } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Unauthorized" });
   }
};
