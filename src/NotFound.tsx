import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NotFound = () => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
         }}
      >
         <div>
            <Typography variant="h1">404 - Page Not Found</Typography>
            <Typography variant="body1">
               The requested page does not exist.
            </Typography>
         </div>
      </Box>
   );
};

export default NotFound;
