import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Footer: React.FC = () => {
   return (
      <footer>
         <Container>
            <Box sx={{ textAlign: "center", m: 2 }}>
               <Typography variant="body2">
                  © 2022 Copyright: React-Typescript
               </Typography>
            </Box>
         </Container>
      </footer>
   );
};

export default Footer;
